export default interface IFilterCharactersDTO {
  name: string;
  order: 'ASC' | 'DESC';
  limit: number;
  offset: number;
}
