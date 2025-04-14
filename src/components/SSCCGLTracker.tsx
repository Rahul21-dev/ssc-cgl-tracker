import { useState, useEffect } from 'react'
import { loadState, saveState } from '../lib/storage'
import { format, addDays, differenceInMilliseconds, endOfDay, isToday } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import { ArrowLeft, ArrowRight, Calendar, Trophy, Clock } from 'lucide-react'

const dailyRoutine = [
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
  { time: "9:30 PM - 10:00 PM", task: "Planning" }
]

const initializeDailyChecks = () => {
  const initialState = {}
  for (let i = 1; i <= 365; i++) {
    initialState[`Day ${i}`] = new Array(dailyRoutine.length).fill(false)
  }
  return initialState
}

export default function SSCCGLTracker() {
  const [currentDay, setCurrentDay] = useState(() => loadState('currentDay', 'Day 1'))
  const [dailyChecks, setDailyChecks] = useState(() => loadState('dailyChecks', initializeDailyChecks()))
  const [lastVisitDate, setLastVisitDate] = useState(() => loadState('lastVisitDate', format(new Date(), 'yyyy-MM-dd')))
  const [timeToNextDay, setTimeToNextDay] = useState('')

  // Auto-advance day logic
  useEffect(() => {
    const checkDayChange = () => {
      const today = format(new Date(), 'yyyy-MM-dd')
      if (lastVisitDate !== today) {
        const currentDayNum = parseInt(currentDay.split(' ')[1])
        if (currentDayNum < 365) {
          const newDay = `Day ${currentDayNum + 1}`
          setCurrentDay(newDay)
          saveState('currentDay', newDay)
        }
        setLastVisitDate(today)
        saveState('lastVisitDate', today)
      }
    }

    checkDayChange()
    const interval = setInterval(checkDayChange, 60000)
    return () => clearInterval(interval)
  }, [currentDay, lastVisitDate])

  // Countdown timer
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date()
      const midnight = endOfDay(now)
      const diff = differenceInMilliseconds(midnight, now)
      
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      
      setTimeToNextDay(`${hours}h ${minutes}m until next day`)
    }

    updateCountdown()
    const timer = setInterval(updateCountdown, 60000)
    return () => clearInterval(timer)
  }, [])

  const toggleTask = (day, taskIndex) => {
    setDailyChecks(prev => {
      const newChecks = { ...prev }
      newChecks[day][taskIndex] = !newChecks[day][taskIndex]
      saveState('dailyChecks', newChecks)
      return newChecks
    })
  }

  const navigateDay = (direction) => {
    const currentDayNum = parseInt(currentDay.split(' ')[1])
    let newDayNum = currentDayNum
    
    if (direction === 'prev' && currentDayNum > 1) {
      newDayNum = currentDayNum - 1
    } else if (direction === 'next' && currentDayNum < 365) {
      newDayNum = currentDayNum + 1
    }

    const newDay = `Day ${newDayNum}`
    setCurrentDay(newDay)
    saveState('currentDay', newDay)
  }

  // Calculate progress
  const dayProgress = (dailyChecks[currentDay]?.filter(Boolean).length / dailyRoutine.length) * 100
  const totalCompleted = Object.values(dailyChecks).flat().filter(Boolean).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-center text-indigo-800 mb-2">SSC CGL 365-Day Tracker</h1>
          <p className="text-center text-indigo-600 mb-6">Your personalized preparation journey</p>
          
          <div className="flex justify-between items-center mb-6">
            <Button variant="outline" onClick={() => navigateDay('prev')} disabled={parseInt(currentDay.split(' ')[1]) === 1}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            
            <div className="text-center">
              <h2 className="text-2xl font-bold text-indigo-700">{currentDay}</h2>
              <p className="text-sm text-gray-500 flex items-center justify-center">
                <Clock className="mr-1 h-4 w-4" /> {timeToNextDay}
              </p>
            </div>
            
            <Button variant="outline" onClick={() => navigateDay('next')} disabled={parseInt(currentDay.split(' ')[1]) === 365}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="mb-6">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-indigo-700">Daily Progress</span>
              <span className="text-sm font-medium text-indigo-700">{Math.round(dayProgress)}%</span>
            </div>
            <Progress value={dayProgress} className="h-2" />
          </div>

          <Card>
            <CardHeader className="bg-indigo-50">
              <CardTitle className="text-xl flex items-center">
                <Calendar className="mr-2 h-5 w-5" /> Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="divide-y">
              {dailyRoutine.map((item, index) => (
                <div key={index} className="flex items-center py-4">
                  <Checkbox
                    id={`task-${index}`}
                    checked={dailyChecks[currentDay][index]}
                    onCheckedChange={() => toggleTask(currentDay, index)}
                    className="h-6 w-6 mr-4"
                  />
                  <div className="flex-1">
                    <Label htmlFor={`task-${index}`} className="flex flex-col">
                      <span className="font-medium text-gray-500 text-sm">{item.time}</span>
                      <span className="text-lg">{item.task}</span>
                    </Label>
                  </div>
                  {dailyChecks[currentDay][index] && (
                    <span className="text-green-500 font-medium">Done</span>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="mt-6 p-4 bg-indigo-50 rounded-lg flex justify-between items-center">
            <div className="flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-indigo-600" />
              <span className="font-medium">Total Completed:</span>
            </div>
            <span className="font-bold text-indigo-700">{totalCompleted} tasks</span>
          </div>
        </div>
      </div>
    </div>
  )
}
