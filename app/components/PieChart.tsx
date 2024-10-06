import React from 'react'
// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/pie
import { ResponsivePie } from '@nivo/pie'
import { linearGradientDef } from '@nivo/core'
import { Stream } from '@nivo/stream'

type PieData = {
    data: ChartData[]
}

const fakeData : PieData = {
    data: [
        {
            "id": "go",
            "label": "go",
            "value": 20,
            "color": "hsl(52, 70%, 50%)"
          },
          {
            "id": "css",
            "label": "css",
            "value": 371,
            "color": "hsl(18, 70%, 50%)"
          },
          {
            "id": "stylus",
            "label": "stylus",
            "value": 282,
            "color": "hsl(352, 70%, 50%)"
          },
          {
            "id": "lisp",
            "label": "lisp",
            "value": 316,
            "color": "hsl(142, 70%, 50%)"
          },
          {
            "id": "sass",
            "label": "sass",
            "value": 343,
            "color": "hsl(42, 70%, 50%)"
          }
    ]
}

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const PieChart = (data: PieData) => {
    return (
        <ResponsivePie
        animate
        data={data.data}
        margin={{ top: 20, right: 40, bottom: 80, left: 40 }}
        innerRadius={0.4}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: 'blues' }}
        borderWidth={2}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        enableArcLinkLabels={false}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#33333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
        defs={[
            // using helpers
            // will inherit colors from current element
            linearGradientDef('mostProb', [
                { offset: 0, color: '#FFAE2D' },
                { offset: 100, color: '#8963B8', opacity: 100 },
            ])
            
        ]}
        fill={[
            // match using object query
            { match: { id: data.data.sort((da, db) => da.value - db.value).reverse()[0].id }, id: 'mostProb' },
            // match using function
            { match: d => d.id === 'vue', id: 'gradientB' },
            // match all, will only affect 'elm', because once a rule match,
            // others are skipped, so now it acts as a fallback
            { match: '*', id: 'gradientC' },
        ]}
    />
    )
}