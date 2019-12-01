
import { addBucket } from '../redux/actions/bucketActions';
import { toggleTaskStatus, updateTask, deleteTask, addTask } from '../redux/actions/taskActions';
import { currentBucket, setTasks, globalTaskObj, bucketWiseTaskCount } from '../redux/actions/globalActions';

const Utilities = {
    refreshTasks: (tasks, buckets) => {
        setTasks(tasks);
        bucketWiseTaskCount(tasks, buckets);
    },

    addNewTask: async (tasks, buckets, globalTaskObj) => {
        const bucketId = buckets.length + 1;
        const taskID = tasks.length + 1;
        const bucketName = globalTaskObj['bucket'];
        let taskObj = { ...globalTaskObj };

        if (typeof taskObj['bucket'] === 'number') {
            taskObj['id'] = taskID;
            taskObj['completed'] = false;
            await addTask(taskObj);
        }

        else {
            await addBucket(bucketId, bucketName).then(() => {
                taskObj['id'] = taskID;
                taskObj['bucket'] = bucketId;
                taskObj['completed'] = false;
                addTask(taskObj).then(() => {
                    setTasks(tasks);
                    bucketWiseTaskCount(tasks, buckets);
                });
            });
        }
    },
}

export default Utilities;