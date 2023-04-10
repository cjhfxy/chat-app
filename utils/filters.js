export function parseTime(time, format) {
	time = time || new Date()
	format = format || '{y}-{m}-{d} {h}:{i}'
	let date
	if (time instanceof Date) {
		date = time
	} else {
		if (String(time).length === 10) time *= 1000
		date = new Date(parseInt(time) || 0)
	}
	const formatObj = {
		y: date.getFullYear(),
		m: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		i: date.getMinutes(),
		s: date.getSeconds(),
		a: date.getDay()
	}
	const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
		let value = formatObj[key]
		if (key === 'a') {
			return ['日', '一', '二', '三', '四', '五', '六'][value]
		}
		if (result.length > 0 && value < 10) {
			value = '0' + value
		}
		return value || 0
	})
	return timeStr
}

export function parseMoney(e) {
	let flag = false
	if (e < 0) {
		flag = true
		e = -e
	}
	e = (e < 10 ? '0' + e : e) || 0
	const arr = String(e).split('').reverse()
	let tmp = []
	arr.forEach((item, index, arr) => {
		tmp.push(item)
		if (index === 1) {
			tmp.push('.')
			if (index === arr.length - 1) {
				tmp.push('0')
			}
		} else if ((index - 1) % 3 === 0 && index !== arr.length - 1 && arr[index + 1] !== '-') {
			tmp.push(',')
		}
	})
	if (Number(tmp[0]) === 0 && Number(tmp[1]) === 0) {
		tmp = tmp.slice(3)
	} else if (Number(tmp[0]) === 0 && tmp[2] === '.') {
		tmp = tmp.slice(1)
	}
	let data = tmp.reverse().join('')
	if (flag) {
		data = '-' + data
	}
	return data
}

//格式化时间
export function formatDate(time) {
	var date = new Date(time);

	var year = date.getFullYear(),
		month = date.getMonth() + 1, //月份是从0开始的
		day = date.getDate(),
		hour = date.getHours(),
		min = date.getMinutes(),
		sec = date.getSeconds();
	var newTime = year + '-' +
		month + '-' +
		day + ' ' +
		hour + ':' +
		min + ':' +
		sec;
	return newTime;
}

/* 部分隐藏处理
 ** str 需要处理的字符串
 ** frontLen 保留的前几位
 ** endLen 保留的后几位
 ** cha 替换的字符串
 */
export function hideStr(str, frontLen, endLen, cha) {
	let len = str.length - frontLen - endLen;
	let xing = "";
	for (let i = 0; i < len; i++) {
		xing += cha;
	}
	return (
		str.substring(0, frontLen) + xing + str.substring(str.length - endLen)
	);
}


/* 截取字符串最后几位
 ** str 需要处理的字符串
 ** len 保留的位数
 */
export function subStr(str, len) {
	return str.substring(str.length - len)
}