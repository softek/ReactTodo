using ReactTodo.App.Dto;

namespace ReactTodo.App;

internal static class DtoConversionExtensions
{
    public static TDto ToDto<TEntity, TDto>(this TEntity entity) where TDto : ICopyableDto<TEntity, TDto>, new()
    {
        var newDto = new TDto();
        newDto.Copy(entity, newDto);
        return newDto;
    }
}
