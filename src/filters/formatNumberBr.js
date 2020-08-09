export const formatNumberPtBr = (number) => {
    let formatter = new Intl.NumberFormat('pt-BR', {
        currency: 'BRL',
        minimumFractionDigits: 2,
    });

    return formatter.format(number);
}