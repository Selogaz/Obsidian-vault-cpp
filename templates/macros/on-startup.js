const SETTING_WORKSPACE = 'Workspace';
const SETTING_AUTO_LOAD_NOTE_LIMIT = 'Auto-load note limit';
const DEFAULT_AUTO_LOAD_NOTE_LIMIT = 3;

function getWorkspaceNames() {
  try {
    const workspacePlugin =
      globalThis.app?.internalPlugins?.plugins?.workspaces;

    const workspaces = workspacePlugin?.instance?.workspaces;

    if (!workspaces) {
      return ['default'];
    }

    const names = Object.keys(workspaces);

    return names.length > 0
      ? names.sort((a, b) => a.localeCompare(b))
      : ['default'];
  } catch (error) {
    console.error('[QuickAdd:onStartup] Failed to get workspaces:', error);

    return ['default'];
  }
}

const workspaceNames = getWorkspaceNames();

module.exports = {
  entry: run,

  settings: {
    name: 'Startup Workspace',
    author: '',
    options: {
      [SETTING_WORKSPACE]: {
        type: 'dropdown',
        defaultValue: workspaceNames.includes('default')
          ? 'default'
          : workspaceNames[0],
        options: workspaceNames,
        description: 'Workspace to load on Obsidian startup',
      },
      [SETTING_AUTO_LOAD_NOTE_LIMIT]: {
        type: 'text',
        defaultValue: String(DEFAULT_AUTO_LOAD_NOTE_LIMIT),
        placeholder: String(DEFAULT_AUTO_LOAD_NOTE_LIMIT),
        description:
          'Skip the menu and preserve open tabs when this many notes or fewer are open. Use 0 to always show the menu.',
      },
    },
  },
};

async function run(params, settings) {
  const { app, quickAddApi, obsidian } = params;
  const { Notice, Platform } = obsidian;

  if (Platform.isMobileApp) return;

  const workspaceName = settings?.[SETTING_WORKSPACE];
  const configuredAutoLoadNoteLimit = Number.parseInt(
    String(
      settings?.[SETTING_AUTO_LOAD_NOTE_LIMIT] ??
        DEFAULT_AUTO_LOAD_NOTE_LIMIT
    ),
    10
  );
  const autoLoadNoteLimit = Number.isNaN(configuredAutoLoadNoteLimit)
    ? DEFAULT_AUTO_LOAD_NOTE_LIMIT
    : Math.max(0, configuredAutoLoadNoteLimit);

  if (!workspaceName) {
    new Notice('No workspace selected.', 4000);
    return;
  }

  const workspacePlugin = app.internalPlugins?.plugins?.workspaces?.instance;

  if (!workspacePlugin?.loadWorkspace) {
    new Notice('Workspaces core plugin is unavailable.', 5000);
    return;
  }

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const getAllLeaves = () => {
    const leaves = [];

    app.workspace.iterateAllLeaves((leaf) => {
      if (leaf.view?.file && leaf.view.navigation !== false) {
        leaves.push(leaf);
      }
    });

    return leaves;
  };

  const getOpenTabs = async () => {
    const allLeaves = getAllLeaves();
    const activeLeaf = app.workspace.activeLeaf;
    const tabs = [];

    for (const leaf of allLeaves) {
      try {
        app.workspace.setActiveLeaf(leaf, { focus: true });

        await sleep(300);

        if (leaf.view?.file) {
          tabs.push({
            path: leaf.view.file.path,
            viewState: leaf.getViewState(),
          });
        }
      } catch (error) {
        console.error('[QuickAdd:onStartup] Error processing leaf:', error);
      }
    }

    if (activeLeaf) {
      app.workspace.setActiveLeaf(activeLeaf, { focus: true });
    }

    return tabs;
  };

  const restoreTabs = async (tabs) => {
    for (const tab of tabs) {
      const file = app.vault.getAbstractFileByPath(tab.path);

      if (!file) continue;

      const leaf = app.workspace.getLeaf(true);

      await leaf.openFile(file);

      if (tab.viewState) {
        await leaf.setViewState({
          ...tab.viewState,
          state: {
            ...tab.viewState.state,
          },
        });
      }

      await sleep(200);
    }
  };

  const loadWorkspace = async () => {
    await workspacePlugin.loadWorkspace(workspaceName);

    new Notice(`Workspace "${workspaceName}" loaded!`, 3000);
  };

  const loadWorkspaceWithOpenTabs = async () => {
    const openTabs = await getOpenTabs();

    await loadWorkspace();

    await sleep(1500);

    await restoreTabs(openTabs);

    if (openTabs.length > 0) {
      new Notice(`Restored ${openTabs.length} tabs`, 3000);
    }
  };

  try {
    await sleep(2000);

    const allLeaves = getAllLeaves();

    if (
      autoLoadNoteLimit > 0 &&
      allLeaves.length <= autoLoadNoteLimit
    ) {
      await loadWorkspaceWithOpenTabs();
      return;
    }

    const choice = await quickAddApi.suggester(
      ['💾 Save open tabs', '🔳 Load a clean workspace'],
      ['save', 'load'],
      `Load workspace: ${workspaceName}`
    );

    if (choice === 'save') {
      await loadWorkspaceWithOpenTabs();

      return;
    }

    if (choice === 'load') {
      await loadWorkspace();
      return;
    }

    new Notice('Operation cancelled', 3000);
  } catch (error) {
    if (error?.name === 'MacroAbortError') {
      return;
    }

    console.error('[QuickAdd:onStartup] Error:', error);

    new Notice(`An error occurred: ${error?.message ?? error}`, 5000);
  }
}
