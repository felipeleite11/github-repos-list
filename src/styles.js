import styled from 'styled-components'

export const Main = styled.main`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	padding: 50px;
	background-color: #333;
	min-height: 100vh;
	height: auto;
`

export const SearchContainer = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: 400px;
	width: 90%;
	margin-bottom: 30px;

	input {
		background-color: #fffC;
		border-radius: 7px;
		padding: 12px 16px;
		width: 100%;
		outline: none;
	}

	svg {
		color: #0003;
		position: relative;
		float: right;
    	margin-right: 12px;
		margin-top: -32px;
	}
`

export const InputContainer = styled.div`
	width: 100%;
`

export const ProfileContainer = styled.section.attrs({
	className: 'animate__animated animate__zoomIn animate__faster'
})`
	display: grid;
	grid-gap: 14px;
	grid-template-columns: 1fr 3fr;
	grid-template-areas:
		'img name'
		'img bio'
		'img button';
	background-color: #e3f2fd;
	padding: 40px;
	max-width: 800px;
	width: 90%;
	border-radius: 4px;
	box-shadow: 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%), 0 2px 4px -1px rgb(0 0 0 / 30%);

	img {
		grid-area: img;
		width: 140px;
		height: 140px;
		border-radius: 50%;
		object-fit: cover;
	}

	h1 {
		grid-area: name;
		font-size: 36px;
		font-weight: 800;
		color: #424242;
	}

	h2 {
		grid-area: bio;
		font-size: 18px;
		font-weight: 300;
		color: #424242;
	}

	button {
		grid-area: button;
	}

	@media(max-width: 800px) {
		width: 100%;
		grid-template-columns: 1fr;
		grid-template-areas:
			'img'
			'name'
			'bio'
			'button';
		justify-items: center;

		h2 {
			text-align: center;
		}
	}
`

export const Button = styled.button`
	border-radius: 10px;
	padding: 10px;
	border: solid 1px #424242;
	color: #424242;
	transition: 300ms;

	&:hover {
		background-color: #FFF;
		color: #424242;
		border: solid 1px #FFF;
		cursor: pointer;
		text-align: center;
	}
`

export const Message = styled.div`
	padding: 6px 8px;
	background-color: #f44336;
	border-radius: 8px;
	color: #FFF;
	margin-top: 14px;
	font-size: 12px;
`

export const RepoContainer = styled.section.attrs({
	className: 'animate__animated animate__zoomIn animate__faster'
})`
	display: flex;
	flex-direction: column;
	padding: 40px;
	overflow-y: auto;
	margin-top: 20px;
	background-color: #e3f2fd;
	max-width: 800px;
	max-height: 500px;
	width: 90%;
	border-radius: 4px;
	box-shadow: 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%), 0 2px 4px -1px rgb(0 0 0 / 30%);

	> h1 {
		font-size: 20px;
		font-weight: 600;
		margin: 0 10px 10px;
	}
`

export const RepoList = styled.ul`
	list-style: none;

	li > a {
		display: grid;
		grid-template-columns: 30px auto;
		grid-template-rows: 2fr 1fr;
		height: 60px;
		grid-gap: 0 12px;
		padding: 10px;
		grid-template-areas:
			'icon title'
			'icon link';

		&:hover {
			background-color: #DDD;
		}

		svg {
			grid-area: icon;
			justify-self: center;
		}

		h1 {
			font-size: 14px;
			font-weight: 600;
		}

		h2 {
			font-size: 12px;
		}
	}
`