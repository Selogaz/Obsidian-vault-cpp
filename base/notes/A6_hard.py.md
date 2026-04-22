---
tags:
  - note/specific/exact
  - category/study
aliases: []
deck: obsidian::study
icon: 📝
color: "#d0a570"
created: 2026-03-15T23:32:28+03:00
updated: 2026-03-16T19:49:52+03:00
---

**A6_hard.py**
—
![[A6_hard.py 2026-03-15.png]]
```python
import math

x,y,angle = 0,0,90
figures = [[(0,0)]]

def move(step):
        global x, y
        rad = math.radians(angle)
        x += round(step * math.cos(rad))
        y += round(step * math.sin(rad))
        figures[-1].append((x,y))

def turn_right(deg):
        global angle
        angle = (angle - deg)%360

def turn_left(deg):
        global angle
        angle = (angle + deg)%360

for _ in range(4):
        move(10)
        turn_right(270)

figures.append([])
move(3)
turn_right(270)
move(5)
turn_right(90)

figures.append([(x,y)])
for _ in range(2):
        move(10)
        turn_right(270)
        move(12)
        turn_right(270)

def get_bounds(points):
        xs = [p[0] for p in points]
        ys = [p[1] for p in points]
        return min(xs), max(xs), min(ys), max(ys)

fig1_xmin, fig1_xmax, fig1_ymin, fig1_ymax = get_bounds(figures[0])
fig2_xmin, fig2_xmax, fig2_ymin, fig2_ymax = get_bounds(figures[2])

area1 = (fig1_xmax - fig1_xmin + 1) * (fig1_ymax - fig1_ymin + 1)
area2 = (fig2_xmax - fig2_xmin + 1) * (fig2_ymax - fig2_ymin + 1)

inter_xmin = max(fig1_xmin, fig2_xmin)
inter_xmax = min(fig1_xmax, fig2_xmax)
inter_ymin = max(fig1_ymin, fig2_ymin)
inter_ymax = min(fig1_ymax, fig2_ymax)

if inter_xmax >= inter_xmin and inter_ymax >= inter_ymin:
        area_inter = (inter_xmax - inter_xmin + 1) * (inter_ymax - inter_ymin + 1)
else:
        area_inter = 0

print(area1 + area2 - area_inter)

```
