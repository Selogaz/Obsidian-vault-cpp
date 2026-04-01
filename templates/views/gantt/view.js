// Get current file (category)
const category = dv.current();

// Check if a project belongs to this category
const isInCategory = (page) =>
  dv.func.contains(
    page.file.frontmatter.tags,
    `category/${category.file.name.replace(/ /g, '_')}`
  ) || dv.func.contains(page.file.frontmatter.category, category.file.link);

// Status configuration with order
const statuses = [
  { emoji: '🟦', name: 'In Progress' },
  { emoji: '🟥', name: 'To Do' },
];

const statusEmojis = statuses.map((s) => s.emoji);

// Get projects with relevant statuses and start date
const relevantProjects = dv
  .pages(
    '(#project/single OR #project/longform OR #project/short) AND -#mark/ignore'
  )
  .where((p) => statusEmojis.includes(p.status) && p.start && isInCategory(p))
  .sort((p) => p.start);

if (relevantProjects.length === 0) {
  dv.paragraph('_No projects with start date found in this category._');
  return;
}

// Helper function to format date for Mermaid
const formatDate = (date) => {
  if (!date) return null;

  // DataView returns Luxon DateTime objects or strings
  if (typeof date === 'string') {
    // Already a string, check if it's in YYYY-MM-DD format
    if (/^\d{4}-\d{2}-\d{2}/.test(date)) {
      return date.split('T')[0];
    }
    return date;
  }

  // Luxon DateTime object
  if (date.toISODate) {
    return date.toISODate();
  }

  // Fallback: try native Date
  if (date.toISOString) {
    return date.toISOString().split('T')[0];
  }

  return null;
};

// Helper function to calculate duration in days
const calculateDuration = (start, end) => {
  if (!start || !end) return null;

  // Handle Luxon DateTime
  if (start.diff && end.diff) {
    const diff = end.diff(start, 'days').days;
    return Math.ceil(diff) > 0 ? Math.ceil(diff) : 1;
  }

  // Fallback to string parsing
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 1;
};

// Compute today's date in local timezone
const now = new Date();
const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

// Build Gantt chart data
const ganttLines = [];
ganttLines.push('gantt');
ganttLines.push(`  title ${category.file.name} - Projects`);
ganttLines.push('  dateFormat YYYY-MM-DD');
ganttLines.push('  axisFormat %d %b');
ganttLines.push('');

// Group projects by status and generate tasks
statuses.forEach((status) => {
  const projectsInStatus = relevantProjects.filter(
    (p) => p.status === status.emoji
  );

  if (projectsInStatus.length > 0) {
    ganttLines.push(`  section ${status.name}`);

    projectsInStatus.forEach((project) => {
      const startDate = formatDate(project.start);
      if (!startDate) return;

      const projectName = project.file.name
        .replace(/:/g, '') // Remove colons (not allowed in Gantt)
        .replace(/\[/g, '(') // Replace brackets
        .replace(/\]/g, ')');

      let taskLine = `    ${projectName} :`;

      if (project.end) {
        const endDate = formatDate(project.end);
        if (endDate) {
          // Project has an end date
          taskLine += ` ${startDate}, ${endDate}`;
        } else {
          // End date exists but couldn't be formatted
          taskLine += ` active, ${startDate}, 30d`;
        }
      } else {
        // No end date - mark as active with current state
        taskLine += ` active, ${startDate}, 30d`;
      }

      ganttLines.push(taskLine);
    });

    ganttLines.push('');
  }
});

// Add explicit today marker as milestone
ganttLines.push('  section .');
ganttLines.push(`    Today : milestone, crit, ${todayStr}, 0d`);
ganttLines.push('');

// Render the Mermaid diagram
dv.paragraph('```mermaid\n' + ganttLines.join('\n') + '\n```');
