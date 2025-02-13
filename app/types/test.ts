export interface Option {
    score: number
    text: string
}

export interface Question {
    text: string
    invert: boolean
}

export interface TestConfig {
    instructions: string
    questions: Question[]
    options: Option[]
    calculate: (answers: number[]) => { total: number; textResult: string }
}
