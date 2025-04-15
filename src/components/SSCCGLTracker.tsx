import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample daily routine structure
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
    setDailyChecks(prev => {
      const newChecks = { ...prev }
      newChecks[day][taskIndex] = !newChecks[day][taskIndex]
      return newChecks
    })
  }

  const days = Array.from({ length: 7 }, (_, i) => `Day ${i + 1}`) // Show first 7 days as example

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">SSC CGL Tier 1 - 365 Day Tracker</h1>
        
        <Tabs defaultValue="Day 1" className="w-full">
          <div className="overflow-x-auto pb-2">
            <TabsList className="grid grid-flow-col auto-cols-max h-auto">
              {days.map(day => (
                <TabsTrigger key={day} value={day} className="px-4 py-2">
                  {day}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {days.map(day => (
            <TabsContent key={day} value={day} asChild>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">{day} Routine</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {dailyRoutine.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg">
                        <Checkbox
                          id={`${day}-task-${index}`}
                          checked={dailyChecks[day][index]}
                          onCheckedChange={() => toggleTask(day, index)}
                          className="h-6 w-6"
                        />
                        <div className="flex-1">
                          <Label htmlFor={`${day}-task-${index}`} className="text-lg">
                            <span className="font-medium text-gray-500">{item.time}</span> - {item.task}
                          </Label>
                        </div>
                        {dailyChecks[day][index] && (
                          <span className="text-green-500 font-medium">Completed</span>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-6 text-center text-gray-500">
          <p>Track your daily progress for all 365 days of SSC CGL Tier 1 preparation</p>
          <p className="mt-2">Completed {Object.values(dailyChecks).flat().filter(Boolean).length} tasks so far</p>
        </div>
      </div>
    </div>
  )
}
