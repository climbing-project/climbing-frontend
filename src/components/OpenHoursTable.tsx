import styled from 'styled-components';
import { OpenHours, OpenHoursTableProps } from '@/constants/types';

const OpenHoursTable = ({ openHours }: OpenHoursTableProps) => {
  const get24HrTime = (data: string) => {
    const [period, hours, minutes] = data.split(',');
    if (period === 'AM')
      return hours === '12' ? `00:${minutes}` : `${hours}:${minutes}`;

    return hours === '12'
      ? `12:${minutes}`
      : `${(Number(hours) + 12).toString()}:${minutes}`;
  };
  return (
    <Styled.Wrapper>
      {openHours.map(({ days, openTime, closeTime }: OpenHours, i) => (
        <li key={i}>
          <div>{days}</div>
          <Styled.Divider>
            <hr />
          </Styled.Divider>
          <div>{`${get24HrTime(openTime)}-${get24HrTime(closeTime)}`}</div>
        </li>
      ))}
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.ul`
    margin-block: 0;
    padding: 0;
    list-style: none;

    li {
      display: flex;
      justify-content: space-between;
      gap: 8px;
    }

    hr {
      position: relative;
      top: 2px;
      border-top: none;
      border-bottom: 1px dashed #d0d0d0;
    }
  `,
  Divider: styled.div`
    flex-grow: 2;
  `,
};

export default OpenHoursTable;
