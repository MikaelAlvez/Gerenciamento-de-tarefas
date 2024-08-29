import styles from './NewTask.module.css';
import Button from '@/app/Components/Button';
import { useRouter } from 'next/navigation';
import { IoIosSave } from "react-icons/io";
import { GiReturnArrow } from "react-icons/gi";

export default function Login() {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push('/ListTasks');
  };

  return (
    <div className={styles.cadastro}>
        <h1>Nova tarefa</h1>
        <div className={styles.dados}>
            <form>
                <div>
                  <label htmlFor="title">Título</label>
                  <input 
                  id="title"
                  type="text" 
                  placeholder="Ex.: Tarefa 1"
                  required
                  />
                </div>
                <div>
                    <label htmlFor="data">Data</label>
                    <input 
                    id="data"
                    type="date" 
                    required
                />
                </div>
                <div>
                    <label htmlFor="obs">Observações</label>
                    <textarea 
                    id="obs"
                    maxLength={150} 
                    placeholder="Digite suas observações aqui..."
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