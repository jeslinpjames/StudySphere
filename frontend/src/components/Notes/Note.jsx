import { MdDeleteForever } from 'react-icons/md';

const Note = () => {
	return (
		<div className='note'>
			<span>Notes:</span>
			<div className='note-footer'>
				<small>1/1/1</small>
				<MdDeleteForever
					onClick={() => handleDeleteNote(id)}
					className='delete-icon'
					size='1.3em'
				/>
			</div>
		</div>
	);
};

export default Note;