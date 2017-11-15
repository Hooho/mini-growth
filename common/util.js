
const formatTime = (date,type) => {

    typeof date ==="string" && (date=new Date(date));
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    
    // second
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':')
}

// 单位数加0
const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}


module.exports = {
    formatTime: formatTime
}
