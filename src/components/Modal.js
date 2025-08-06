import ReactDOM from 'react-dom';

function Modal({ onClose, children, actionBar }) {

    return ReactDOM.createPortal(
        <div>
            <div className="fixed inset-0 bg-[#7a7a7c] opacity-80" onClick={onClose}></div>
            <div className="fixed rounded-lg inset-x-[11%] md:inset-x-[32%] xl:inset-x-[37%] inset-y-[28%] md:inset-y-[31%] xl:inset-y-[33%] p-10 bg-white">
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