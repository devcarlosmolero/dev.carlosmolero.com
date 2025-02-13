import { useState } from 'react'
import { IResource } from '~/types/contentful'
import { TestConfig } from '~/types/test'
import Button from '../atoms/Button'

interface TestProps {
    config: TestConfig
    resource: IResource
}

export default function Test({ resource, config }: TestProps) {
    const { instructions, questions, options, calculate } = config

    const [answers, setAnswers] = useState<number[]>([])
    const [result, setResult] = useState<{
        total: number
        textResult: string
    } | null>(null)

    const handleAnswerChange = (index: number, score: number) => {
        const newAnswers = [...answers]
        newAnswers[index] = score
        setAnswers(newAnswers)
    }

    const calculateResult = () => {
        const result = calculate(answers)
        setResult(result)
    }

    return (
        <div>
            <h1 className="text-4xl font-bold tracking-tighter">
                {resource.seoTitle}
            </h1>
            <p className="mt-2 line-clamp-3 text-gray-600">{instructions}</p>

            <form className="mt-5 space-y-3">
                {questions.map((question, index) => (
                    <div className="space-y-2" key={index}>
                        <p className="font-semibold">{question.text}</p>
                        <div className="flex flex-col items-start gap-x-2">
                            {options.map((option) => (
                                <label
                                    className="flex items-center"
                                    key={option.score}
                                >
                                    <input
                                        type="radio"
                                        name={`question-${index}`}
                                        value={option.score}
                                        onChange={() =>
                                            handleAnswerChange(
                                                index,
                                                question.invert
                                                    ? -option.score
                                                    : option.score
                                            )
                                        }
                                    />
                                    <p className="ml-1 inline-block">
                                        {option.text}
                                    </p>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </form>

            <Button
                variant={
                    answers.length === questions.length ? 'primary' : 'disabled'
                }
                className="mt-5 !w-fit"
                onClick={calculateResult}
            >
                Calcular Resultado
            </Button>

            {result && (
                <div className="mt-3 rounded-lg bg-primary-light p-5">
                    <p>Puntuación Total: {result.total}</p>
                    <p>Conclusión: {result.textResult}</p>
                </div>
            )}
        </div>
    )
}
