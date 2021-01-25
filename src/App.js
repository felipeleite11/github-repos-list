import React, { useRef, useCallback, useReducer, useState } from 'react'
import { FaSearch, FaGithub } from 'react-icons/fa'
import { debounce } from 'lodash'

//BASE EXAMPLE
//https://app.rocketseat.com.br/experts/lesson/react-hooks-avancado

import { Main, SearchContainer, ProfileContainer, InputContainer, RepoContainer, Button, Message, RepoList } from './styles'

const STATUS = {
	IDLE: 'idle',
	ERROR: 'error',
	SEARCHING: 'searching',
	RESOLVED: 'resolved'
}

const searchReducer = (state, action) => {
	switch(action.type) {
		case STATUS.SEARCHING:
			return {
				status: STATUS.SEARCHING,
				error: null,
				repos: [],
				user: null
			}

		case STATUS.RESOLVED:
			return {
				status: STATUS.RESOLVED,
				error: null,
				repos: action.repos || [],
				user: action.user
			}

		case STATUS.ERROR:
			return {
				status: STATUS.ERROR,
				error: action.error,
				repos: [],
				user: null
			}

		case STATUS.IDLE:
			return {
				status: STATUS.IDLE,
				error: null,
				repos: [],
				user: null
			}
		
		default:
			throw new Error(`Unhandled action: ${action.type}`)
	}
}

function App() {
	const [showRepos, setShowRepos] = useState(false)
	const [state, dispatch] = useReducer(searchReducer, {
		status: '', 
		user: '',
		error: '',
		repos: []
	})

	const { user, error, repos } = state

	const debouncedRef = useRef(
		debounce(value => {
			runSearch(value)

			dispatch({ type: STATUS.SEARCHING })
		}, 500)
	).current

	async function handleSearch(username) {
		debouncedRef(username)
	}

	const runSearch = useCallback(async search => {
		if(search) {
			try {
				const userFinded = await fetch(`https://api.github.com/users/${search}`).then(response => response.json())
				let reposFinded

				if(userFinded) {
					reposFinded = await fetch(`https://api.github.com/users/${search}/repos`).then(response => response.json())
				} else {
					throw new Error('User not found!')
				}

				dispatch({ type: STATUS.RESOLVED, user: userFinded, repos: reposFinded || [] })
			} catch(e) {
				dispatch({ type: STATUS.ERROR, error: error.message })
			}
		}
	}, [])

	return (
		<Main>
			<SearchContainer>
				<InputContainer>
					<input type="text" onChange={e => handleSearch(e.target.value)} placeholder="Search a Github user..." />
					<FaSearch size={18} />
				</InputContainer>

				{error && (
					<Message>
						{error}
					</Message>
				)}
			</SearchContainer>

			{user && (
				<ProfileContainer>
					<img src={user.avatar_url} alt="" />
					<h1>{user.name}</h1>
					<h2>{user.bio}</h2>
					<Button onClick={() => { 
						if(showRepos) {
							document.querySelector('#repo-container').classList.remove('animate__zoomIn')
							document.querySelector('#repo-container').classList.add('animate__backOutDown')

							setTimeout(() => { 
								setShowRepos(!showRepos) 
							}, 600)
						} else {
							setShowRepos(!showRepos) 

							setTimeout(() => { 
								window.location.href = '#repo-container' 
							}, 400)
						}
					}}>
						{showRepos ? 'Hide repos' :'Show repos'}
					</Button>
				</ProfileContainer>
			)}

			{showRepos && (
				<RepoContainer id="repo-container">
					<h1>{user.name}'s repos</h1>

					<RepoList>
						{repos.length > 0 ? repos.map(repo => (
							<li key={repo.id}>
								<a href={`https://github.com/${repo.full_name}`} target="_blank" rel="noreferrer">
									<FaGithub size={30} />
									<h1>{repo.name}</h1>
									<h2>
										{repo.full_name}
									</h2>
								</a>
							</li>
						)) : (
							<h2>No repositories</h2>
						)}
					</RepoList>
				</RepoContainer>
			)}
		</Main>
	)
}
	
export default App

