import { UniqueEntityID } from "../../core/entities/unique-entity-id";
import { Answer } from "../entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";

interface AnswerQuestionUseCaseRequest {
  instructorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  constructor (
    private answerRepository: AnswersRepository,
  ) {}

  async execute({instructorId, questionId, content}: AnswerQuestionUseCaseRequest) {
    const answer = Answer.Create({
     content,
     authorId: new UniqueEntityID(instructorId),
     questionId: new UniqueEntityID(questionId)
    });

    await this.answerRepository.create(answer);

    return answer;
  }
}