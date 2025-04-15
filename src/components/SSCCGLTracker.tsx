import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "/components/ui/card";
import { Checkbox } from "/components/ui/checkbox";
import { Label } from "/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "/components/ui/tabs";

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
  { time: "9:30 PM - 10:00 PM", task: "Next Day Planning" }
];

export default function SSCCGLTracker() {
  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const diff = today.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  const currentDay = `Day ${dayOfYear}`;

  const [dailyChecks, setDailyChecks] = useState<Record<string, boolean[]>>(() => {
    const initialState: Record<string, boolean[]> = {};
    for (let i = 1; i <= 365; i++) {
      initialState[`Day ${i}`] = new Array(dailyRoutine.length).fill(false);
    }
    return initialState;
  });

  const toggleTask = (day: string, taskIndex: number) => {
    setDailyChecks(prev => {
      const newChecks = { ...prev };
      newChecks[day][taskIndex] = !newChecks[day][taskIndex];
      return newChecks;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">SSC CGL Tier 1 - 365 Day Tracker</h1>
        
        <Tabs defaultValue={currentDay} className="w-full">
          <div className="overflow-x-auto pb-2">
            <TabsList className="grid grid-flow-col auto-cols-max h-auto">
              {[currentDay, `Day ${dayOfYear-1}`, `Day ${dayOfYear+1}`].map(day => (
                <TabsTrigger key={day} value={day} className="px-4 py-2">
                  {day}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {[currentDay, `Day ${dayOfYear-1}`, `Day ${dayOfYear+1}`].map(day => (
            <TabsContent key={day} value={day}>
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
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-6 text-center text-gray-500">
          <p>Current Date: {today.toLocaleDateString()}</p>
          <p className="mt-2">Completed {Object.values(dailyChecks).flat().filter(Boolean).length} tasks total</p>
        </div>
      </div>
    </div>
  );
}
