import { useState, useEffect } from 'react'

const DAILY_ROUTINE = [
  { time: "5:00 AM - 6:00 AM", task: "Morning Revision" },
  { time: "6:00 AM - 7:30 AM", task: "Quantitative Aptitude" },
  { time: "7:30 AM - 8:00 AM", task: "Breakfast" },
  { time: "8:00 AM - 10:00 AM", task: "English Language" },
  { time: "10:00 AM - 10:30 AM", task: "Short Break" },
  { time: "10:30 AM - 12:30 PM", task: "General Awareness" },
  { time: "12:30 PM - 2:00 PM", task: "Lunch Break" },
  { time: "2:00 PM - 4:00 PM", task: "Reasoning Practice" },
  { time: "4:00 PM - 4:30 PM", task: "Tea Break" },
  { time: "4:30 PM - 6:30 PM", task: "Mock Tests" },
  { time: "6:30 PM - 7:30 PM", task: "Error Analysis" },
  { time: "7:30 PM - 8:30 PM", task: "Dinner" },
  { time: "8:30 PM - 9:30 PM", task: "Current Affairs" },
  { time: "9:30 PM - 10:00 PM", task: "Next Day Planning" }
] as const

export default function SSCCGLTracker() {
  const [currentDay, setCurrentDay] = useState('Day 1')
  const [dailyChecks, setDailyChecks] = useState<Record<string, boolean[]>>(() => {
    const saved = localStorage.getItem('dailyChecks')
    return saved ? JSON.parse(saved) : initializeChecks()
  })

  function initializeChecks() {
    const checks: Record<string, boolean[]> = {}
    for (let i = 1; i <= 365; i++) {
      checks[`Day ${i}`] = new Array(DAILY_ROUTINE.length).fill(false)
    }
    return checks
  }

  useEffect(() => {
    localStorage.setItem('dailyChecks', JSON.stringify(dailyChecks))
  }, [dailyChecks])

  const toggleTask = (taskIndex: number) => {
    setDailyChecks(prev => {
      const newChecks = { ...prev }
      newChecks[currentDay][taskIndex] = !newChecks[currentDay][taskIndex]
      return newChecks
    })
  }

  const progress = Math.round(
    (dailyChecks[currentDay].filter(Boolean).length / DAILY_ROUTINE.length) * 100
  )

  return (
    <div className="max-w-3xl mx-auto">
      {/* Day Selector */}
      <div className="flex overflow-x-auto gap-2 mb-6 pb-2">
        {Array.from({ length: 7 }).map((_, i) => {
          const day = `Day ${i + 1}`
          return (
            <button
              key={day}
              onClick={() => setCurrentDay(day)}
              className={`px-4 py-2 rounded-md ${
                currentDay === day
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              {day}
            </button>
          )
        })}
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between mb-1">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {DAILY_ROUTINE.map((item, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border ${
              dailyChecks[currentDay][index]
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200'
                : 'bg-white dark:bg-gray-800'
            }`}
          >
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={dailyChecks[currentDay][index]}
                onChange={() => toggleTask(index)}
                className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <span className="block text-sm text-gray-500 dark:text-gray-400">
                  {item.time}
                </span>
                <span className="block font-medium">{item.task}</span>
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}
