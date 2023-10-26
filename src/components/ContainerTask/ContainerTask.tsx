import { ChangeEvent, FormEvent, InvalidEvent, useState, useRef, useEffect  } from 'react'
import { Task } from '../Task/Task'
import styles from './ContainerTask.module.css'
import { Header } from '../HeaderInput/Header'


export function ContainerTask() {

    const [tasks, setTasks] = useState<{ id: number, content: string }[]>([])
    const [newTasks, setNewTasks] = useState('')
    const [countCompletedTask, setCountCompletedTask] = useState(0)
    const uniqueIdRef = useRef(0);

    // Aparecer a mensagem inicial se stiver sem nenhum comentário
    const initialMessageAppears = tasks.length === 0;
    const countTasks = tasks.length


    // Adiciona um novo comentário e matém os comentários existentes
    function handleCreatNewTask (event: FormEvent) {
        event.preventDefault();

        const newTask = { id: uniqueIdRef.current, content: newTasks };
        uniqueIdRef.current++;
        
        setTasks([...tasks, newTask])
        setNewTasks('')
    }

    /* function saveTasks(taskToSave: { id: number, content: string }[]) {
         const saveTask = taskToSave.map(task => task.content.trim());
        const tasksJSON = JSON.stringify(saveTask);
         localStorage.setItem('tasks', tasksJSON);
    }

     function getSaveTasks(){
         const taskStorage = localStorage.getItem('tasks');
         let listTask = []
        
        if (taskStorage !== null) {
            listTask = JSON.parse(taskStorage);
             return listTask;
        } 
     }

     useEffect(() => {
         const savedTasks = getSaveTasks();
      
        if (savedTasks) {
          setTasks(updatedTasks);
        }
       }, []);
    */
  
    // Monitora as mudanças no Input
    function handleNewCommentChange(event: ChangeEvent<HTMLInputElement>) {
        event.target.setCustomValidity("");
        setNewTasks(event.target.value)
        
    }

    // Deletar tarefa 
    function deleteTask (taskToDeleted: { id: number, content: string }) {
        const tasksWithoutTaskToDelete = tasks.filter(task => {
            return task.id !== taskToDeleted.id
    })
        // Faz alterações nas tarefas criadas
        setTasks(tasksWithoutTaskToDelete); 
    }

    function handleNewInvalidTask(event: InvalidEvent<HTMLInputElement>){
        event.target.setCustomValidity("Esse campo é obrigatório");
    }
    
    // Modifica o contador de tarefas concluídas, a função é exportada para o componente Task
    function updateCountCompletedTask(isChecked: boolean){
        isChecked ? setCountCompletedTask(countCompletedTask - 1) : setCountCompletedTask(countCompletedTask + 1)
    }

    return(
        <section className= {styles.sectionToDoList}>
            <div className={styles.headerPrimary}>
            <Header
                submit = {handleCreatNewTask}
                change= {handleNewCommentChange}
                value= {newTasks}
                onInvalid= {handleNewInvalidTask}
            />
            </div>
            <div className={styles.container}>

                <header className={styles.header}>
                    <span className={styles.tasksMetrics}>
                        <span className={styles.tasksMetricsLegend}>
                            Tarefas
                        </span>
                        <span className={styles.tasksMetricsNumber} >
                            {countTasks}
                        </span>
                    </span>
                    <span className={styles.tasksMetrics}>
                        <span className={styles.tasksMetricsLegend}>
                            Concluídas
                        </span>
                        <span className={styles.tasksMetricsNumber}>
                            {countCompletedTask}
                        </span>
                    </span>
                </header>

                { initialMessageAppears && (
                    <div className={styles.containerInitialMensagem}>
                        <div>
                            <img src="src/assets/Clipboard.svg" alt="Clipboard" />
                        </div>
                        <div className={styles.InitialMensagemLegend}>
                            <p>Você ainda não tem tarefas cadastradas</p>
                            <p>Crie tarefas e organize seus itens a fazer</p>
                        </div>
                    </div>
                )}

                <section className={styles.sectionTask}>
                    <div className={styles.containerTask}>
                        {tasks.map((task) => {
                            return (
                                <Task
                                    key={task.id}
                                    content={task.content}
                                    onDeleteTask={() => deleteTask(task)}
                                    updateCountCompletedTask = {updateCountCompletedTask}
                                />
                            )
                        })}
                    </div>
                </section>
                
            </div>
        </section>
    )
}