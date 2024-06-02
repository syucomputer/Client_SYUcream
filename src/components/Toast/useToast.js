import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useToast = () => {
    const showToast = (message, type) => {
        const config = {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            rtl: false,
            pauseOnFocusLoss: false,
            draggable: false,
            pauseOnHover: false,
        };

        switch (type) {
            case 'success':
                toast.success(message, config);
                break;
            case 'error':
                toast.error(message, config);
                break;
            case 'warning':
                toast.warning(message, config);
                break;
            default:
                toast(message, config);
                break;
        }
    };

    return showToast;
};

export default useToast;
