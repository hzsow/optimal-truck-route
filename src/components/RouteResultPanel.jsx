import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'

const RouteResultPanel = () => {
	const routeInfo = useSelector(state => state.main.routeInfo);

	const time = useMemo(() => routeInfo.baseTime && parseFloat(routeInfo.baseTime / 60).toFixed(0), [routeInfo])
	const distance = useMemo(() => routeInfo.distance && parseFloat(routeInfo.distance / 1000).toFixed(2), [routeInfo])
	
	if (!time && !distance) return null;

	return <div className="space_panel_area">
		<div className='info'>
			<div className='info_title'>Информация о маршруте</div>
			<div className='info_desc'>
				<span className='mr5'>Протяженность маршрута:</span>
				<span>{distance} км</span>
			</div>
			<div className='info_desc'>
				<span className='mr5'>Время в пути: </span>
				<span>{time} мин</span>
			</div>
		</div>
	</div>
}

export default RouteResultPanel