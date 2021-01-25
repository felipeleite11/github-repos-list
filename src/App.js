import React, { useState, useEffect, useRef } from 'react'
import { FaSearch, FaGithub } from 'react-icons/fa'
import { debounce } from 'lodash'

import { Main, SearchContainer, ProfileContainer, InputContainer, RepoContainer, Button, Message, RepoList } from './styles'

function App() {
	const [search, setSearch] = useState(null)
	const [user, setUser] = useState(null)
	const [repos, setRepos] = useState(null)
	const [message, setMessage] = useState(null)

	const debouncedRef = useRef(
		debounce(value => {
			setSearch(value)
		}, 500)
	).current

	async function handleSearch(username) {
		debouncedRef(username)
	}

	async function handleShowRepos() {
		if(user) {
			fetch(`https://api.github.com/users/${user.login}/repos`)
				.then(response => response.json())
				.then(response => {
					setRepos(response)

					window.location.href = '#repo-container'
				})
				.catch(() => {
					setRepos(null)
				})
		}
	}

	useEffect(() => {
		if(search) {
			fetch(`https://api.github.com/users/${search}`)
				.then(response => response.json())
				.then(response => {
					if(response.login) {
						setUser(response)
						setMessage(null)
					} else {
						throw new Error('User not found!')
					}
				})
				.catch(error => {
					setMessage(error.message)
					setUser(null)
				})
		} else {
			setMessage(null)
			setUser(null)
		}
	}, [search])

	return (
		<Main>
			<SearchContainer>
				<InputContainer>
					<input type="text" onChange={e => handleSearch(e.target.value)} placeholder="Search a Github user..." />
					<FaSearch size={18} />
				</InputContainer>

				{message && (
					<Message>
						{message}
					</Message>
				)}
			</SearchContainer>

			{user && (
				<ProfileContainer>
					<img src={user.avatar_url} alt="" />
					<h1>{user.name}</h1>
					<h2>{user.bio}</h2>
					<Button onClick={handleShowRepos}>
						Show repos
					</Button>
				</ProfileContainer>
			)}

			{repos && (
				<RepoContainer id="repo-container">
					<h1>{user.name}'s repos</h1>

					<RepoList>
						{repos.map(repo => (
							<li key={repo.id}>
								<a href={`https://github.com/${repo.full_name}`} target="_blank">
									<FaGithub size={30} />
									<h1>{repo.name}</h1>
									<h2>
										{repo.full_name}
									</h2>
								</a>
							</li>
						))}
					</RepoList>
				</RepoContainer>
			)}
		</Main>
	)
}
	
export default App



//https://app.rocketseat.com.br/experts/lesson/react-hooks-avancado
	
//https://api.github.com/users/felipeleite11

//https://api.github.com/users/felipeleite11/repos