import { BasicInfo as BI } from '@/src/types/info'
import dayjs from 'dayjs'

export const BasicInfo = ({
  address,
  dateOfBirth,
  goal,
  hobbies,
  languages,
  links,
  name,
  rate,
}: BI) => {
  console.log({ dateOfBirth })

  return (
    <div className='basic-info'>
      <div className='name'>{name}</div>
      <div className='rate'>{rate}</div>
      <div className='goal'>{goal}</div>
      <div className='dob'>{dayjs(dateOfBirth).format('DD/MM/YYYY')}</div>
      <div className='address'>{address}</div>
      <div className='links'>
        {links.map(link => (
          <div className='link'>{link.text}</div>
        ))}
      </div>
    </div>
  )
}
