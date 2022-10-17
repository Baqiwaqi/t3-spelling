import { useState } from 'react'
import { textToSpeech } from '../utils/textToSpeech'

const Practise = () => {
  const [text, setText] = useState('Hond')
  const [input, setInput] = useState<string>();


  function checkWord() {
    if (input === text) {

    } else {

    }
  }

  return (
    <div className="pt-8">
      <h1 className="text-2xl font-bold">
        Oefenen
      </h1>
      <p className="mt-3 text-sm">
        Oefen hier je spelling door naar het woord te luisteren en het juiste woord in te vullen. Ja kan zo vaak oefen als je wilt. De test resultaten worden opgeslagen en je kan je resultaten bekijken in je profiel.
      </p>
      <div className="flex w-full justify-center">
        <div className="max-w-xl mt-6 p-4 sm:w-full border">
          <div className="flex gap-8">
            <button className="px-3 py-1 rounded-md bg-black text-white"
              onClick={() => textToSpeech(text)}
            >
              Say word
            </button>
            <button className="px-3 py-1 border rounded-md">
              skip
            </button>
          </div>
          <input className="mt-4 w-full border rounded-md p-2" type="text" onChange={(e) => setInput(e.target.value)} />
          <div className="mt-4 flex justify-between">
            <button className="px-3 py-1 rounded-md bg-black text-white"
              onClick={checkWord}
            >
              Controlleer
            </button>
            <button className="px-3 py-1 border rounded-md">
              Start Over
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Practise
