import {useState,useEffect} from 'react'
import {firebase} from '../firebase'
import {collatedTasksExist} from '../helpers/index'
import moment from 'moment'
//use customize hooks useTasks
export const useTasks=selectedProject=>{    
    let [tasks,setTasks]=useState([]);  //init deafult state 
    let [arcivedTasks,setArcivedTasks]=useState([]);  //init deafult state 

    useEffect(()=>{
    let unsubscribe=firebase
    .firestore()
    .collection('tasks')               //在这里我们拿到了firebase中的user数据
    .where("userId","==",'ljl123456')   //query res from firebase
    
    unsubscribe=
    selectedProject &&!collatedTasksExist(selectedProject)?  //如果用户选中了一个组，但是这个组不在已经存在的组中
    (unsubscribe=unsubscribe.where("projectId","==",selectedProject))   //去数据库里查询projectid
    :selectedProject==='TODAY'     //如果用户选择的组是Today
    ?(unsubscribe=unsubscribe.where("date","==",moment().format('DD/MM/YYYY'))) //查询data为today
    :selectedProject==="INBOX" ||selectedProject===0    //如果用户选择的组是Inbox，或者选择的组是空时
    ?(unsubscribe=unsubscribe.where('data','==',''))       //返回日期为空的数据
    :unsubscribe   //返回当前的userId的数据
    
    unsubscribe.onSnapshot(snapshot=>{
        const newTasks=snapshot.docs.map(task=>({
            id:task.id,
            ...task.data()
        }))
        setTasks(
            selectedProject==='NEXT_7'
            ?newTasks.filter(
                task=>moment(task.date,'DD-MM-YYYY').diff(moment(),'days')<7 &&
                task.archived!==true
            )
            :newTasks.filter(task=>task.archived!==true)
        );
        setArcivedTasks(newTasks.filter(task=>task.archived!==false));
        
    })
        return ()=>unsubscribe();
    },[selectedProject])
    return {tasks,arcivedTasks}
}
                                  

export const useProjects=()=>{
    const [projects,setProjects]=useState([]);
    useEffect(()=>{
        firebase
           .firestore()
           .collection('projectId')
           .where('userId','==','ljl123456')
           .orderBy('projectId')
           .get()
           .then(snapshot=>{
               const allProjects=snapshot.docs.map(project=>({
                   ...project.data(),
                   docId:project.id
               }));
               //compare project change
               if(JSON.stringify(allProjects)!==JSON.stringify(projects)) {
                    setProjects(allProjects)
               }     
           })
    },[projects])
    return  {projects,setProjects};
}