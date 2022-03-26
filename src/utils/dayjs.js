// 封装一个多久多久之前的一个函数
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh' // 集成中文

export const GetHowLongBefore = (Times) => {
  // 格式化时间
  dayjs.extend(relativeTime)
  dayjs.locale('zh')
  // 获取当前的时间
  const a = dayjs()
  // 获取指定的时间
  const b = dayjs(Times)

  return b.from(a)
}
