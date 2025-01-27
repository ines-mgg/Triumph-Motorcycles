import { AppointmentRepository } from '../AppointmentRepository';
import { AppointmentNotFoundError } from '@triumph-motorcycles/domain/errors';
import { appointment } from '../../../tests/testUtils';

describe('AppointmentRepository', () => {
  let appointmentRepository: AppointmentRepository;
  beforeEach(() => {
    appointmentRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findByUserId: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
  });

  it('should save an appointment', async () => {
    await appointmentRepository.save(appointment);
    expect(appointmentRepository.save).toHaveBeenCalledWith(appointment);
  });

  it('should find an appointment by ID', async () => {
    (appointmentRepository.findById as jest.Mock).mockResolvedValue(
      appointment,
    );
    const result = await appointmentRepository.findById(
      appointment.appointmentId,
    );
    expect(appointmentRepository.findById).toHaveBeenCalledWith(
      appointment.appointmentId,
    );
    expect(result).toBe(appointment);
  });

  it('should return an error if appointment not found by ID', async () => {
    const appointmentId = '123';
    (appointmentRepository.findById as jest.Mock).mockResolvedValue(
      new AppointmentNotFoundError(),
    );

    const result = await appointmentRepository.findById(appointmentId);
    expect(appointmentRepository.findById).toHaveBeenCalledWith(appointmentId);
    expect(result).toBeInstanceOf(AppointmentNotFoundError);
  });

  it('should find appointments by user ID', async () => {
    (appointmentRepository.findByUserId as jest.Mock).mockResolvedValue(
      appointment,
    );

    const result = await appointmentRepository.findByUserId(
      appointment.user.identifier,
    );
    expect(appointmentRepository.findByUserId).toHaveBeenCalledWith(
      appointment.user.identifier,
    );
    expect(result).toBe(appointment);
  });

  it('should update an appointment', async () => {
    await appointmentRepository.update(appointment);
    expect(appointmentRepository.update).toHaveBeenCalledWith(appointment);
  });

  it('should delete an appointment by ID', async () => {
    await appointmentRepository.delete(appointment.appointmentId);
    expect(appointmentRepository.delete).toHaveBeenCalledWith(
      appointment.appointmentId,
    );
  });
});
