import { useMemo } from 'react'
import { findPeakTime } from '../utils/findPeakTime'
import classes from './PeakVisitors.module.css'

export const PeakVisitors = ({ data }: { data: number[][] }) => {

    const peakTime: {
        maxTime: number,
        maxCount: number
    } = useMemo(() => findPeakTime(data), [data])

    const { maxCount, maxTime } = peakTime

    return (
        <div className={classes.wrapper}>
            <h2>Peak Visitors</h2>
            <table>
                <tbody>
                    <tr>
                        <th>Timestamp</th>
                        <th>Count</th>
                        <th>Type</th>
                    </tr>
                    {
                        data.map((item, i) => {
                            console.log(new Date(item[0]))
                            return (
                                <>
                                    <tr
                                        key={`${item}${i}`}
                                        className={maxTime === item[0] ? classes.highlight : ''}
                                    >
                                        <td>{item[0]}</td>
                                        <td>{item[1]}</td>
                                        <td>{item[2] === 0 ? 'out' : 'in'}</td>
                                        {
                                            maxTime === item[0] && (
                                                <td>Total: {maxCount}</td>
                                            )
                                        }
                                    </tr>
                                </>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}