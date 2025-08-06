import ReactDOM from 'react-dom';

function Modal({ onClose, children, actionBar }) {

    return ReactDOM.createPortal(
        <div>
            <div className="fixed inset-0 bg-[#7a7a7c] opacity-80" onClick={onClose}></div>
            <div className="fixed rounded-lg inset-x-5 sm:inset-x-40 xl:inset-x-2/5 inset-y-48 sm:inset-y-48 xl:inset-y-56 p-10 bg-white">
                {children}
                <div className="flex justify-center gap-1.5">
                    {actionBar}
                </div>
            </div>
        </div>,
        document.querySelector('.modal-container')
    );
}

export default Modal;