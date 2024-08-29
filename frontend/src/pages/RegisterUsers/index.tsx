import styles from './RegisterUsers.module.css';
import Button from '@/app/Components/Button';
import { useRouter } from 'next/navigation';
import { IoIosSave } from "react-icons/io";
import { GiReturnArrow } from "react-icons/gi";

export default function Login() {
  const router = useRouter();
  const handleLoginRedirect = () => {
    router.push('/');
  };

  return (
    <div className={styles.cadastro}>
        <h1>Cadastrar</h1>
        <div className={styles.dados}>
            <form>
                <div>
                  <label htmlFor="nome">Nome</label>
                  <input 
                  id="nome"
                  type="text" 
                  placeholder="Nome"
                  required
                  />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input 
                    id="email"
                    type="email" 
                    placeholder="email@email.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password">Senha</label>
                  <input 
                  id="password"
                  type="password" 
                  placeholder="********"
                  required
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword">Confirmar senha</label>
                  <input 
                  id="confirmPassword"
                  type="password" 
                  placeholder="********"
                  required
                  />
                </div>
            </form>
            <div className={styles.buttons}>
              <Button onClick={handleLoginRedirect}>
                <GiReturnArrow />
                Voltar
              </Button>
              <Button>
                <IoIosSave />
                Salvar
              </Button>
            </div>
        </div>
    </div>
  );
}