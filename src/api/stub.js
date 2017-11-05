import React from 'react';

export const response = () => {
    const data = {
        'daysList' :  ['10/01', '10/02', '10/03', '10/04', '10/05', '10/06', '10/07'],
        'locationList' : ['Tokyo', 'Osaka', 'Nagoya', 'Fukuoka', 'Hiroshima', 'Hokkaido', 'Shizuoka'],
        'locationAnswerList' : ['Tokyo', 'Osaka', 'Nagoya', 'Fukuoka', 'Hiroshima', 'Hokkaido', 'Shizuoka'],
        'successList' : ['3/5', '2/5', '1/5', '4/5', '2/5', '3/5', '1/5'],
        'warningList' : ['1/5', '2/5', '3/5', '4/5', '1/5', '2/5', '1/5'],
        'removeList' : ['2/5', '3/5', '4/5', '1/5', '2/5', '3/5', '4/5'],
        'answersData' : [
            {
                'name' : 'Yamada Rina',
                'data' : [
                    'success',
                    'warning',
                    'success',
                    'remove',
                    'success',
                    'warning',
                    'remove'
                ]
            },
            {
                'name' : 'Mai MaiCuong',
                'data' : [
                    'remove',
                    'warning',
                    'success',
                    'warning',
                    'success',
                    'warning',
                    'remove'
                ]
            },
            {
                'name' : 'Le VanThanh',
                'data' : [
                    'success',
                    'remove',
                    'success',
                    'warning',
                    'remove',
                    'warning',
                    'remove'
                ]
            }
        ]
    }
    return data;
}

export const dateData = () => {
    const data = ['10/01', '10/02', '10/03', '10/04', '10/05', '10/06', '10/07'];
    return data;
}

export const answerData = () => {
    const data = [
        {
            'name' : 'Yamada Rina',
            'data' : [
                'success',
                'warning',
                'success',
                'remove',
                'success',
                'warning',
                'remove'
            ]
        },
        {
            'name' : 'Mai MaiCuong',
            'data' : [
                'remove',
                'warning',
                'success',
                'warning',
                'success',
                'warning',
                'remove'
            ]
        },
        {
            'name' : 'Le VanThanh',
            'data' : [
                'success',
                'remove',
                'success',
                'warning',
                'remove',
                'warning',
                'remove'
            ]
        }
    ]
    return data;
}