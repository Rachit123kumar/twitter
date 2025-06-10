import { useState } from "react"
import { Button } from "../../components/components/ui/button"
import { Input } from "../../components/components/ui/input"
import { Label } from "../../components/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/components/ui/sheet"
import axios from "axios"
import { toast } from "react-toastify"




















export function SheetDemo({ openTheme, setOpenTheme, replaceQuestions }) {

  const [subject, setSubject] = useState('');
  const [medium, setMedium] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [classLevel, setClassLevel] = useState('');
  const [topic, setTopic] = useState('');
  const [numQuestions, setNumQuestions] = useState(0)
  const [loading, setLoading] = useState(false)




  async function generateQuestions() {
    setLoading(true)
    try {
      const prompt = `Generate ${numQuestions} multiple choice questions for class ${classLevel} ${subject} on the topic "${topic}" in ${medium} language with ${difficulty} difficulty. 

Each question should be an object in a JSON array, with the following format:
{
  "question": "What is 2+2?",
  "options": ["2", "3", "4", "5"],
  "correct_answer": "4"
}
`;

      const response = await axios.post('/api/generateQuestion', {
        request: prompt
      })
      console.log(typeof (response.data))

      const cleaned = response.data
        .replace(/^```json\s*/, '')
        .replace(/^```\s*/, '')
        .replace(/```$/, '');

      console.log(cleaned);

      // ✅ Parse the JSON string to actual JS objects
      const parsed = JSON.parse(cleaned);

      // ✅ Replace the questions
      replaceQuestions(parsed.map(q => ({
        title: q.question,
        description:'',
        options: q.options,
        correct_answer: q.correct_answer
      })));

      setLoading(false);

    } catch (err) {
      console.log(err)
      toast.error('Not good response')
      setLoading(false)
    }


  }
















  return (
    <Sheet open={openTheme} closed={true}>
      {/* <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger> */}
      <SheetContent>
        <SheetHeader>
          <SheetTitle className=" text-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text ">Ask Gemini </SheetTitle>
          <SheetDescription>
            Take help of Gemini to generate Questions.
          </SheetDescription>
        </SheetHeader>
        <div className="grid grid-cols-1  space-y-4  mx-2 ">
          <div className="flex gap-2 items-center">

            <label htmlFor="subject">Subject</label>
            <input placeholder="Maths " id="subject" className="bg-gray-200  max-w-full px-3 py-2 text-gray-800 font-sans rounded-sm" value={subject} onChange={(e) => setSubject(e.target.value)} />
          </div>

          <div className="flex gap-2 items-center">

            <label htmlFor="topic" >Subject</label>
            <input placeholder="Topic" id="topic" className="bg-gray-200  max-w-full px-3 py-2 text-gray-800 font-sans rounded-sm" value={topic} onChange={(e) => setTopic(e.target.value)} />
          </div>

          <div>
            <label htmlFor="class">Select class </label>


            <select value={classLevel} id="class" className="w-full" onChange={(e) => setClassLevel(e.target.value)}>
              <option value="">Select a class</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>



          <div className="">

            <label>Select language </label>
            <select value={medium} className="w-full" onChange={(e) => setMedium(e.target.value)}>
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
              <option value="french">French</option>

            </select>
          </div>

          <div >
            <label>difficulty level</label>

            <select value={difficulty} className="w-full" onChange={(e) => setDifficulty(e.target.value)}>
              <option vlaue="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="">
            <label>Number of question  you have to generate </label>

            <input type="number" className="w-full" value={numQuestions} onChange={(e) => setNumQuestions(Number(e.target.value))} />
          </div>
        </div>


        <SheetFooter>
          <Button type="submit" onClick={() => generateQuestions()} disabled={loading}>{loading ? "loading " : "Generate"}  </Button>
          <SheetClose asChild>
            <Button variant="outline" onClick={() => setOpenTheme(false)}>Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
