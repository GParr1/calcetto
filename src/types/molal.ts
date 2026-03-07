export interface ModalInfo {
  modalTitle: string
  mode: string
  handleSubmit: (evt: React.FormEvent<HTMLFormElement>, obj?: any) => void
}