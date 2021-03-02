import { GoslingSpec } from '../../core/gosling.schema';
import { GOSLING_PUBLIC_DATA } from './gosling-data';

export const EX_SPEC_LINKING: GoslingSpec = {
    title: 'Visual Linking',
    subtitle: 'Change the position and range of brushes to update the detail view on the bottom',
    arrangement: 'vertical',
    centerRadius: 0.4,
    views: [
        {
            spacing: 40,
            arrangement: 'horizontal',
            views: [
                {
                    spacing: 5,
                    layout: 'circular',
                    xDomain: { chromosome: '1' },
                    tracks: [
                        {
                            data: {
                                url: GOSLING_PUBLIC_DATA.multivec,
                                type: 'multivec',
                                row: 'sample',
                                column: 'position',
                                value: 'peak',
                                categories: ['sample 1', 'sample 2', 'sample 3', 'sample 4']
                            },
                            x: { field: 'start', type: 'genomic' },
                            xe: { field: 'end', type: 'genomic' },
                            y: { field: 'peak', type: 'quantitative' },
                            row: { field: 'sample', type: 'nominal' },
                            color: { field: 'sample', type: 'nominal' },
                            width: 250,
                            height: 130,
                            overlay: [
                                { mark: 'bar' },
                                {
                                    mark: 'brush',
                                    x: { linkingId: 'detail' }
                                }
                            ]
                        }
                    ]
                },
                {
                    layout: 'linear',
                    xDomain: { chromosome: '1' },
                    tracks: [
                        {
                            data: {
                                url: GOSLING_PUBLIC_DATA.multivec,
                                type: 'multivec',
                                row: 'sample',
                                column: 'position',
                                value: 'peak',
                                categories: ['sample 1', 'sample 2', 'sample 3', 'sample 4']
                            },
                            x: { field: 'start', type: 'genomic' },
                            xe: { field: 'end', type: 'genomic' },
                            y: { field: 'peak', type: 'quantitative' },
                            row: { field: 'sample', type: 'nominal' },
                            color: { field: 'sample', type: 'nominal' },
                            width: 400,
                            height: 200,
                            overlay: [
                                { mark: 'bar' },
                                {
                                    mark: 'brush',
                                    x: { linkingId: 'detail' }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            layout: 'linear',
            xDomain: { chromosome: '1', interval: [160000000, 200000000] },
            xLinkingId: 'detail',
            tracks: [
                {
                    data: {
                        url: GOSLING_PUBLIC_DATA.multivec,
                        type: 'multivec',
                        row: 'sample',
                        column: 'position',
                        value: 'peak',
                        categories: ['sample 1', 'sample 2', 'sample 3', 'sample 4']
                    },
                    mark: 'bar',
                    x: {
                        field: 'position',
                        type: 'genomic',
                        axis: 'top'
                    },
                    y: { field: 'peak', type: 'quantitative' },
                    row: { field: 'sample', type: 'nominal' },
                    color: { field: 'sample', type: 'nominal' },
                    width: 690,
                    height: 200
                }
            ]
        }
    ]
};