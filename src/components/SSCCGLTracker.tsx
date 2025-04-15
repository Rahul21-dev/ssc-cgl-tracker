import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "/components/ui/card"
import { Checkbox } from "/components/ui/checkbox"
import { Label } from "/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "/components/ui/tabs"
import { Progress } from "/components/ui/progress"
import { Button } from "/components/ui/button"
import { Calendar, Clock, BookOpen, CheckCircle } from "lucide-react"

const dailyRoutine = [
  { time: "5:00 AM - 6:00 AM", task: "Morning Revision", icon: <BookOpen className="w-4 h-4" /> },
  { time: "6:00 AM - 7:30 AM", task: "Quantitative Aptitude", icon: <BookOpen className="w-4 h-4" /> },
  { time: "7:30 AM - 8:00 AM", task: "Breakfast", icon: <Clock className="w-4 h-4" /> },
  { time: "8:00 AM - 10:00 AM", task: "English Language", icon: <BookOpen className="w-4 h-4" /> },
  { time: "10:00 AM - 10:30 AM", task: "Short Break", icon: <Clock className="w-4 h-4" /> },
  { time: "10:30 AM - 12:30 PM", task: "General Awareness", icon: <BookOpen className="w-4 h-4" /> },
  { time: "12:30 PM - 2:00 PM", task: "Lunch Break", icon: <Clock className="w-4 h-4" /> },
  { time: "2:00 PM - 4:00 PM", task: "Reasoning Practice", icon: <BookOpen className="w-4 h-4" /> },
  { time: "4:00 PM - 4:30 PM", task: "Tea Break", icon: <Clock className="w-4 h-4" /> },
  { time: "4:30 PM - 6:30 PM", task: "Mock Tests", icon: <BookOpen className="w-4 h-4" /> },
  { time: "6:30 PM - 7:30 PM", task: "Error Analysis", icon: <BookOpen className="w-4 h-4" /> },
  { time: "7:30 PM - 8:30 PM", task: "Dinner", icon: <Clock className="w-4 h-4" /> },
  { time: "8:30 PM - 9:30 PM", task: "Current Affairs", icon: <BookOpen className="w-4 h-4" /> },
  { time: "9:30 PM - 10:00 PM", task: "Planning", icon: <BookOpen className="w-4 h-4" /> }
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
    setDailyChecks(prev => {
      const newChecks = { ...prev }
      newChecks[day][taskIndex] = !newChecks[day][taskIndex]
      return newChecks
    })
  }

  const days = Array.from({ length: 365 }, (_, i) => `Day ${i + 1}`)
  const currentDay = "Day 1"
  const completionPercentage = Math.round(
    (dailyChecks[currentDay].filter(Boolean).length / dailyRoutine.length) * 100
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-indigo-800 mb-2">
            SSC CGL Tier 1 Tracker
          </h1>
          <p className="text-lg text-indigo-600">
            Your 365-day preparation journey
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-indigo-700">
            <Calendar className="w-5 h-5" />
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </header>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="p-6 bg-indigo-700 text-white">
            <h2 className="text-xl font-semibold">Today's Progress</h2>
            <div className="flex items-center gap-4 mt-4">
              <Progress 
                value={completionPercentage} 
                className="h-3 bg-indigo-600"
                indicatorClassName="bg-white"
              />
              <span className="font-medium">{completionPercentage}%</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue={currentDay}>
          <div className="mb-6 bg-white rounded-lg shadow-sm p-1">
            <TabsList className="grid grid-flow-col auto-cols-fr h-auto">
              {days.slice(0, 7).map(day => (
                <TabsTrigger 
                  key={day} 
                  value={day}
                  className="py-3 data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700"
                >
                  {day}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {days.slice(0, 7).map(day => (
            <TabsContent key={day} value={day}>
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-indigo-700 rounded-t-lg">
                  <CardTitle className="text-white text-xl">
                    {day} Routine
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="divide-y divide-gray-200">
                    {dailyRoutine.map((item, index) => (
                      <li key={index} className="hover:bg-gray-50 transition-colors">
                        <div className="flex items-center p-4 gap-4">
                          <div className="flex-shrink-0">
                            <Checkbox
                              id={`${day}-task-${index}`}
                              checked={dailyChecks[day][index]}
                              onCheckedChange={() => toggleTask(day, index)}
                              className="h-6 w-6 border-2 border-indigo-300 data-[state=checked]:bg-indigo-600"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 text-indigo-700">
                              {item.icon}
                              <span className="font-medium text-sm">{item.time}</span>
                            </div>
                            <Label 
                              htmlFor={`${day}-task-${index}`} 
                              className={`block mt-1 text-lg ${dailyChecks[day][index] ? 'line-through text-gray-400' : 'text-gray-800'}`}
                            >
                              {item.task}
                            </Label>
                          </div>
                          {dailyChecks[day][index] && (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <footer className="mt-8 text-center text-gray-600 text-sm">
          <p>Stay consistent! You've completed {Object.values(dailyChecks).flat().filter(Boolean).length} tasks so far.</p>
          <p className="mt-1">© {new Date().getFullYear()} SSC CGL Prep Tracker</p>
        </footer>
      </div>
    </div>
  )
}
