---
tags:
  - mark/gtd
cssclasses:
  - hide-properties
  - hide-backlinks
icon: ❤️ 
---

> [!todo]+ todo
>
> ```tasks
> not done
> tags include category/health
> group by function \
>   if (task.tags.includes("#task/inbox"))         return "%%01%% [[_inbox|📥 inbox]]"; \
>   if (task.tags.includes("#task/next_action"))   return "%%02%% [[_next_action|🚀 next action]]"; \
>   if (task.tags.includes("#task/one-off"))       return "%%03%% [[_one-off|1️⃣ one-off]]"; \
>   if (task.tags.includes("#task/multistep"))     return "%%04%% [[_multistep|🏗 multistep]]"; \
>   if (task.tags.includes("#task/waiting_for"))   return "%%05%% [[_waiting_for|💤 waiting for]]"; \
>   if (task.tags.includes("#task/regular"))       return "%%06%% [[_regular|🔁 regular]]"; \
>   if (task.tags.includes("#task/idea"))          return "%%07%% [[_idea|💡 ideas]]"; \
>   if (task.tags.includes("#task/reference"))     return "%%08%% [[_reference|🔗 references]]"; \
>   if (task.tags.includes("#task/someday"))       return "%%09%% [[_someday|🤷 someday]]"; \
>   return "%%00%% Without status";
> group by function \
>   if (task.tags.includes("#priority/a"))         return "%%01%% - 🇦 Important and urgent"; \
>   if (task.tags.includes("#priority/b"))         return "%%02%% - 🇧 Important"; \
>   if (task.tags.includes("#priority/c"))         return "%%03%% - 🇨 Сommon task"; \
>   if (task.tags.includes("#priority/d"))         return "%%04%% - 🇩 Delegate"; \
>   if (task.tags.includes("#priority/e"))         return "%%05%% - 🇪 Eliminate"; \
>   return "%%99%%";
> hide task count
> hide tags
> ```

> [!success]- archive
>
> ```tasks
> done
> tags include #category/health
> group by function task.tags.filter( (tag) => tag.includes("#task/") ).map( (tag) => tag.split('/')[1] ? tag.split('/').slice(1, 2) : '')
> sort by done reverse
> hide task count
> hide tags
> ```
