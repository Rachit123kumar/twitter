"use client"
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import { useForm, useFieldArray } from "react-hook-form"

import { MdOutlineCloudDone, MdOutlineDraw } from "react-icons/md"
import { BsThreeDotsVertical } from "react-icons/bs"
import { TiTick } from "react-icons/ti"
import { Button } from "../../components/components/ui/button"
import { SheetDemo } from '../_components/SheetDemo'
import { RiGeminiFill } from "react-icons/ri"
import { Textarea } from '@mui/joy'
import { PDFDownloadLink, pdf } from '@react-pdf/renderer'
import DppDocument from '../_components/Ai/DppDocument'
// import DownloadPage from '../_components/Ai/DownloadPage'
const DownloadPage = dynamic(() => import('../_components/Ai/DownloadPage'), { ssr: false })

export default function Page() {
  const [formName, setFormName] = useState('Untitled')
  const [openTheme, setOpenTheme] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      questions: [
        {
          title: "title",
          description: "optional description",
          options: ["option1", "option2", "option3", "option4"],
          correct_answer: "option1"
        }
      ]
    }
  })

  const { fields, append ,replace} = useFieldArray({
    name: "questions",
    control,
  })
const onSubmit = async (data) => {
  console.log("✅ Form Data:", data)

  const blob = await pdf(<DppDocument
     questions={data.questions} />).toBlob()

  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${formName || "questions"}.pdf`
  a.click()
  URL.revokeObjectURL(url)
}

  return (
    <div className=''>
      <div className='shadow-lg px-2 py-2 border-1 mx-2 rounded-md mt-1'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <input
              className='text-white shadow-md border-1 rounded-sm mr-1 px-1 bg-transparent'
              value={formName}
              type="text"
              onChange={(e) => setFormName(e.target.value)}
            />
            <div className='flex gap-1'>
              <span><MdOutlineCloudDone className='text-white' /></span>
              <p className='text-xs text-white'>saving..</p>
            </div>
          </div>

          <div className='flex gap-3 items-center'>
            <span onClick={() => setOpenTheme(true)}><MdOutlineDraw className='text-white size-5' /></span>
            {/* <Button className='bg-blue-600 text-white'>Publish</Button> */}
            {/* <span><BsThreeDotsVertical className='mx-2 my-2 rounded-full hover:bg-gray-800 size-5 text-white' /></span> */}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Button
          type="button"
          className='sticky top-20 left-10'
          onClick={() => append({
            title: "New Question",
            description: "",
            options: ["", "", "", ""],
            correct_answer: ""
          })}
        >
          + Add
        </Button>

        <Button className='absolute top-20 right-10'>{fields.length} questions</Button>

        {/* <DownloadPage questions={fields} /> */}

        <div className='flex items-center w-full justify-center flex-col space-y-4 mt-10'>
          {fields.map((field, i) => (
            <div key={field.id} className='text-white shadow-lg rounded-md border-1 max-w-[700px] w-full flex flex-col p-4 bg-gray-900'>
              <Textarea
                className='p-2 bg-gray-800 rounded mb-2'
                placeholder='Title'
                {...register(`questions.${i}.title`)}
              />
              <input
                className='p-2 bg-gray-800 rounded mb-2'
                placeholder='Description'
                {...register(`questions.${i}.description`)}
              />

            {[0, 1, 2, 3].map((optIdx) => (
  <div key={optIdx} className='flex gap-2 items-center mb-2'>
    <input
      type="text"
      placeholder={`Option ${optIdx + 1}`}
      className='flex-1 px-2 py-2 bg-gray-700 rounded'
      {...register(`questions.${i}.options.${optIdx}`)}
    />
    {/* Tick Icon for UI */}
{fields[i].correct_answer== fields[i].options.optIdx &&    <TiTick className='fill-green-500' />}
  </div>
))}


              <input
                className='p-2 bg-gray-700 rounded mt-2'
                placeholder='Correct Answer'
                {...register(`questions.${i}.correct_answer`)}
              />
            </div>
          ))}
        </div>
        <Button type="submit" className='my-10 mx-auto block bg-blue-600'>Download PDF</Button>
      </form>

      <Button
        className='cursor-pointer fixed bottom-20 right-5 p-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
        onClick={() => setOpenTheme(true)}
      >
        <RiGeminiFill className='size-6 text-white' />
      </Button>

      <SheetDemo openTheme={openTheme} setOpenTheme={setOpenTheme} replaceQuestions={replace} />
    </div>
  )
}
