const formatNumber: (value: number) => string = (value) => {
    return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default {
    formatNumber
};