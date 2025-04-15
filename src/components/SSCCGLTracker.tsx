import { useState } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import './styles./globals.css' // Create this file for basic styling

// Sample routine data
const dailyRoutine = [
  { time: "7:00 AM - 8:00 AM", task: "Wake Up + Freshen Up" },
  { time: "8:00 AM - 10:00 AM", task: "Study Slot 1" },
  { time: "10:00 AM - 10:15 AM", task: "Break" },
  { time: "10:15 AM - 12:15 PM", task: "Study Slot 2" },
  { time: "12:15 PM - 1:00 PM", task: "Break / Relax" },
  { time: "1:00 PM - 1:30 PM", task: "Lunch" },
  { time: "1:30 PM - 3:30 PM", task: "Study Slot 3" },
  { time: "3:30 PM - 4:00 PM", task: "Break" },
  { time: "4:00 PM - 6:00 PM", task: "Cricket / Physical Activity" },
  { time: "6:00 PM - 6:30 PM", task: "Rest / Tea Break" },
  { time: "6:30 PM - 8:30 PM", task: "Study Slot 4" },
  { time: "8:30 PM - 10:00 PM", task: "Dinner + Light Relaxation" },
  { time: "10:00 PM - 12:00 AM", task: "Relaxation Time / Entertainment" }
]

export default function SSCCGLTracker() {
  const [dailyChecks, setDailyChecks] = useState<Record<string, boolean[]>>(() => {
    const initialState: Record<string, boolean[]> = {}
    for (let i = 1; i <= 365; i++) {
      initialState[`Day ${i}`] = new Array(dailyRoutine.length).fill(false)
    }
    return initialState
  })

  const toggleTask = (day: string, taskIndex: number) => {
    setDailyChecks(prev => ({
      ...prev,
      [day]: prev[day].map((val, i) => 
        i === taskIndex ? !val : val
      )
    }))
  }

  return (
    <div className="tracker-container">
      <h1>SSC CGL Tier 1 - 365 Day Tracker</h1>
      
      <Tabs.Root defaultValue="Day 1">
        <Tabs.List className="tabs-list">
          {['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'].map(day => (
            <Tabs.Trigger key={day} value={day} className="tab-trigger">
              {day}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'].map(day => (
          <Tabs.Content key={day} value={day} className="tab-content">
            <h2>{day} Routine</h2>
            <div className="routine-grid">
              {dailyRoutine.map((item, index) => (
                <div key={index} className="routine-item">
                  <input
                    type="checkbox"
                    checked={dailyChecks[day][index]}
                    onChange={() => toggleTask(day, index)}
                  />
                  <span className="time">{item.time}</span>
                  <span className="task">{item.task}</span>
                  {dailyChecks[day][index] && (
                    <span className="completed">✓</span>
                  )}
                </div>
              ))}
            </div>
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </div>
  )
}
