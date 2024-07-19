namespace ReactTodo.App.Dto;

public interface ICopyableDto<in TEntity, in TDto>
{
    void Copy(TEntity source, TDto targetDto);
}
