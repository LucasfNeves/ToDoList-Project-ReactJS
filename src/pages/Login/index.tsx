import { FormEvent, useState } from 'react'
import styles from './styles.module.css'

import LogoMain from './../../assets/LogoMain.svg'

import { Link, useNavigate } from 'react-router-dom'

import { auth } from '../../firebaseConection'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Eye, EyeClosed } from 'phosphor-react'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  function handleShowPassword() {
    setShowPassword(!showPassword)
  }

  const navigate = useNavigate()

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (email !== '' && password !== '') {
      try {
        await signInWithEmailAndPassword(auth, email, password)

        navigate('/admin', { replace: true })

        setEmail('')
        setPassword('')
      } catch (error) {
        alert('Erro ao realizar login !')
      }
    } else {
      alert('Preencha todos os campos !')
    }
  }

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.title}>
        To-do List <img src={LogoMain} alt="Logo" />{' '}
      </h1>
      <span> Gerencia suas tarefas de forma fácil</span>

      <form className={styles.form} onSubmit={handleLogin}>
        <label htmlFor="email">
          <input
            type="email"
            id="email"
            placeholder="Digite seu email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password" className={styles.labelWithButton}>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="Digite sua senha..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          />
          <button type="button" onClick={handleShowPassword}>
            {showPassword ? (
              <Eye size={20} weight="bold" />
            ) : (
              <EyeClosed size={20} weight="bold" />
            )}
          </button>
        </label>
        <button className={styles.buttonLogin} type="submit">
          Acessar
        </button>
      </form>
      <span className={styles.link}>
        Não possui uma conta ?<Link to={'/register'}>Cadastre-se !</Link>
      </span>
    </div>
  )
}
