import { ResponsiveBar } from '@nivo/bar';
import React, { FC } from 'react';

interface IDataFileds {
  [key:string]: string;
}

interface IData{
data: Array<IDataFileds>
}

const BarChart:FC<IData> = ({ data }) => (
    <ResponsiveBar
      data={data}
      keys={['High', 'Normal', 'Low']}
      indexBy="date"
      margin={{ top: 120, right: 80, bottom: 150, left: 80 }}
      padding={0.8}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={['#EB5757', '#29CC97', '#F2C94C']}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: '#38bcb2',
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: '#eed312',
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: 'fries',
          },
          id: 'dots',
        },
        {
          match: {
            id: 'sandwich',
          },
          id: 'lines',
        },
      ]}
      borderRadius={10}
      borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: -40,
      }}
      enableGridY={false}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'top-left',
          direction: 'row',
          justify: false,
          translateX: -30,
          translateY: -80,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          itemOpacity: 0.85,
          // eslint-disable-next-line react/no-unstable-nested-components
          symbolShape: ({ fill }) => <rect fill={fill} width='14px' height='16px' rx='20' />,
          effects: [
            {
              on: 'hover',
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      ariaLabel="Nivo bar chart demo"
    />
  )

export default BarChart;