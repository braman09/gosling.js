import { GeminiSpec } from '../../core/gemini.schema';

export const EXAMPLE_DATA_FETCHER: GeminiSpec = {
    tracks: [
        {
            data: {
                type: 'csv',
                url:
                    'https://raw.githubusercontent.com/sehilyi/gemini-datasets/master/data/Homo_sapiens.GRCh38.92.small.csv',
                chromosomeField: 'Chr.',
                genomicFields: ['ISCN_start', 'ISCN_stop', 'Basepair_start', 'Basepair_stop'],
                quantitativeFields: ['start', 'end'],
                /* TODO: add this to the semanticZoom spec below */
                urlAlt: 'https://raw.githubusercontent.com/sehilyi/gemini-datasets/master/data/cytogenetic_band.csv',
                quantitativeFieldsAlt: ['Band', 'Density']
            },
            semanticZoom: {
                type: 'alternative-encoding',
                spec: {
                    superpose: [
                        {
                            mark: 'rect',
                            dataTransform: {
                                filter: [{ field: 'Stain', oneOf: ['acen-1', 'acen-2'], not: true }]
                            },
                            color: {
                                field: 'Density',
                                type: 'nominal',
                                domain: ['', '25', '50', '75', '100'],
                                range: ['white', '#D9D9D9', '#979797', '#636363', 'black']
                            }
                        },
                        {
                            mark: 'rect',
                            dataTransform: {
                                filter: [{ field: 'Stain', oneOf: ['gvar'], not: false }]
                            },
                            color: { value: '#A0A0F2' }
                        },
                        {
                            mark: 'triangle-l',
                            dataTransform: {
                                filter: [{ field: 'Stain', oneOf: ['acen-2'], not: false }]
                            },
                            color: { value: '#B40101' }
                        },
                        {
                            mark: 'triangle-r',
                            dataTransform: {
                                filter: [{ field: 'Stain', oneOf: ['acen-1'], not: false }]
                            },
                            color: { value: '#B40101' }
                        }
                    ],
                    x: { field: 'Basepair_start', type: 'genomic', domain: { chromosome: '1' }, axis: 'top' },
                    xe: { field: 'Basepair_stop', type: 'genomic' },
                    row: { value: 0 }, // null,
                    size: { value: 30 },
                    stroke: { value: 'black' },
                    strokeWidth: { value: 0.5 },
                    dataTransform: { filter: [] }
                },
                trigger: {
                    operation: 'less-than',
                    condition: { zoomLevel: 11 },
                    target: 'track'
                }
            },
            superpose: [
                {
                    dataTransform: {
                        filter: [
                            { field: 'feature', oneOf: ['gene'], not: false },
                            { field: 'strand', oneOf: ['+'], not: false }
                        ]
                    },
                    mark: 'triangle-r',
                    x: {
                        field: 'end',
                        type: 'genomic',
                        domain: { chromosome: '1', interval: [1, 300000] },
                        axis: 'top'
                    },
                    color: { value: '#999999' }
                },
                {
                    dataTransform: {
                        filter: [
                            { field: 'feature', oneOf: ['gene'], not: false },
                            { field: 'strand', oneOf: ['-'], not: false }
                        ]
                    },
                    mark: 'triangle-l',
                    x: {
                        field: 'start',
                        type: 'genomic',
                        axis: 'top'
                    },
                    color: { value: '#999999' },
                    style: { align: 'right' }
                },
                {
                    dataTransform: { filter: [{ field: 'feature', oneOf: ['gene'], not: false }] },
                    mark: 'rect',
                    x: {
                        field: 'start',
                        type: 'genomic',
                        axis: 'top'
                    },
                    xe: {
                        field: 'end',
                        type: 'genomic'
                    },
                    color: { value: 'lightgray' }
                },
                {
                    dataTransform: { filter: [{ field: 'feature', oneOf: ['gene'], not: false }] },
                    mark: 'rule',
                    x: {
                        field: 'start',
                        type: 'genomic',
                        axis: 'top'
                    },
                    strokeWidth: { value: 5 },
                    xe: {
                        field: 'end',
                        type: 'genomic'
                    },
                    color: { value: 'gray' }
                },
                {
                    dataTransform: { filter: [{ field: 'feature', oneOf: ['exon'], not: false }] },
                    mark: 'rect',
                    x: {
                        field: 'start',
                        type: 'genomic',
                        axis: 'top'
                    },
                    xe: {
                        field: 'end',
                        type: 'genomic'
                    },
                    color: { value: '#E2A6F5' },
                    stroke: { value: '#BB57C9' },
                    strokeWidth: { value: 1 }
                }
            ],
            row: { field: 'strand', type: 'nominal', domain: ['+', '-'] },
            size: { value: 15 },
            width: 1000,
            height: 60
        }
    ]
};
