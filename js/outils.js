Array.prototype.shuffle = function () {
    var arr = this,
        i, j, tmp;

    for (i = arr.length - 1; i >= 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        tmp = arr[j];
        arr[j] = arr[i];
        arr[i] = tmp;
    }
    return arr;
}