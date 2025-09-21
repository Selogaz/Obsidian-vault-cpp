---
limit: 100
mapWithTag: true
icon: calendar
tagNames:
  - periodic/day
excludes: 
extends: periodic
version: "2.185"
fields:
  - name: vital_signs
    type: Object
    options:
      displayTemplate: ""
    path: ""
    id: VDwh5n
  - name: morning
    type: Object
    options:
      displayTemplate: ""
    path: VDwh5n
    id: Bdeu3f
  - name: body_temperature
    type: Number
    options:
      min: 35
      max: 45
      step: 0.1
    path: VDwh5n____Bdeu3f
    id: QP3Un2
  - name: pulse_rate
    type: Number
    options:
      min: 1
      max: 250
      step: 1
    path: VDwh5n____Bdeu3f
    id: fcXAMP
  - name: SpO2
    type: Number
    options:
      min: 1
      max: 100
      step: 1
    path: VDwh5n____Bdeu3f
    id: gUUSsU
  - name: afternoon
    type: Object
    options:
      displayTemplate: ""
    path: VDwh5n
    id: aqYiQS
  - name: body_temperature
    type: Number
    options:
      step: 0.1
      min: 35
      max: 45
    path: VDwh5n____aqYiQS
    id: e2Tsva
  - name: pulse_rate
    type: Number
    options:
      min: 1
      max: 250
      step: 1
    path: VDwh5n____aqYiQS
    id: QVhfRT
  - name: SpO2
    type: Number
    options:
      min: 1
      max: 100
      step: 1
    path: VDwh5n____aqYiQS
    id: HPPW58
  - name: evening
    type: Object
    options:
      displayTemplate: ""
    path: VDwh5n
    id: INhQhe
  - name: body_temperature
    type: Number
    options:
      min: 35
      step: 0.1
      max: 45
    path: VDwh5n____INhQhe
    id: iW1CTS
  - name: pulse_rate
    type: Number
    options:
      min: 1
      max: 250
      step: 1
    path: VDwh5n____INhQhe
    id: ely64v
  - name: SpO2
    type: Number
    options:
      min: 1
      max: 100
      step: 1
    path: VDwh5n____INhQhe
    id: 6Yqs3g
  - name: systolic_blood_pressure
    type: Number
    options:
      step: 1
      min: 1
      max: 250
    path: VDwh5n____Bdeu3f
    id: JUHFPT
  - name: diastolic_blood_pressure
    type: Number
    options:
      step: 1
      min: 1
      max: 250
    path: VDwh5n____Bdeu3f
    id: 1NJ9rU
  - name: systolic_blood_pressure
    type: Number
    options:
      step: 1
      min: 1
      max: 250
    path: VDwh5n____aqYiQS
    id: AEZmgl
  - name: systolic_blood_pressure
    type: Number
    options:
      step: 1
      min: 1
      max: 250
    path: VDwh5n____INhQhe
    id: zop029
  - name: diastolic_blood_pressure
    type: Number
    options:
      step: 1
      min: 1
      max: 250
    path: VDwh5n____aqYiQS
    id: FV5qlH
  - name: diastolic_blood_pressure
    type: Number
    options:
      step: 1
      min: 1
      max: 250
    path: VDwh5n____INhQhe
    id: O2I5e6
  - name: bodyweight_exercises
    type: Object
    options:
      displayTemplate: ""
    path: ""
    id: LGvNl4
  - name: walking
    type: Number
    options:
      step: 1
      min: 1
      max: 100
    path: LGvNl4
    id: Ocqano
  - name: running
    type: Number
    options:
      step: 1
      min: 1
      max: 100
    path: LGvNl4
    id: zALXzP
  - name: cycling
    type: Number
    options:
      step: 1
      min: 1
      max: 100
    path: LGvNl4
    id: ZsSqzG
  - name: push-ups
    type: Number
    options:
      step: 1
      min: 1
      max: 1000
    path: LGvNl4
    id: o67KL6
  - name: sit-ups
    type: Number
    options:
      step: 1
      min: 1
      max: 1000
    path: LGvNl4
    id: RBAuNo
  - name: squats
    type: Number
    options:
      step: 1
      min: 1
      max: 1000
    path: LGvNl4
    id: h0IVIb
  - name: pull-ups
    type: Number
    options:
      step: 1
      min: 1
      max: 100
    path: LGvNl4
    id: X2dJOf
filesPaths: 
bookmarksGroups: 
savedViews: []
favoriteView: 
fieldsOrder:
  - VDwh5n
  - Bdeu3f
  - QP3Un2
  - JUHFPT
  - 1NJ9rU
  - fcXAMP
  - gUUSsU
  - aqYiQS
  - e2Tsva
  - AEZmgl
  - FV5qlH
  - QVhfRT
  - HPPW58
  - INhQhe
  - iW1CTS
  - zop029
  - O2I5e6
  - ely64v
  - 6Yqs3g
  - LGvNl4
  - X2dJOf
  - h0IVIb
  - RBAuNo
  - o67KL6
  - ZsSqzG
  - zALXzP
  - Ocqano
---
