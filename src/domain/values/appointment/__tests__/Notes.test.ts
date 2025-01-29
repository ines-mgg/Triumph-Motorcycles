import { Notes } from '../Notes';
import { InvalidNoteError } from '@triumph-motorcycles/domain/errors/appointment/InvalidNoteError';

describe('Notes', () => {
  it('should create a valid Notes instance', () => {
    const value = 'Valid note';
    const notes = Notes.from(value);
    expect(notes).toBeInstanceOf(Notes);
    if (notes instanceof Notes) {
      expect(notes.value).toBe(value);
    }
  });

  it('should return an error for invalid notes', () => {
    const value = 'Invalid note!';
    const notes = Notes.from(value);
    expect(notes).toBeInstanceOf(InvalidNoteError);
  });

  it('should trim the value', () => {
    const value = '  Valid note  ';
    const notes = Notes.from(value);
    expect(notes).toBeInstanceOf(Notes);
    if (notes instanceof Notes) {
      expect(notes.value).toBe('Valid note');
    }
  });

  it('should compare two Notes instances correctly', () => {
    const value1 = 'Note 1';
    const value2 = 'Note 2';
    const notes1 = Notes.from(value1);
    const notes2 = Notes.from(value2);
    const notes3 = Notes.from(value1);

    if (
      notes1 instanceof Notes &&
      notes2 instanceof Notes &&
      notes3 instanceof Notes
    ) {
      expect(notes1.is(notes2)).toBe(false);
      expect(notes1.is(notes3)).toBe(true);
    }
  });

  it('should compare note value correctly', () => {
    const value = 'Note';
    const notes = Notes.from(value);
    if (notes instanceof Notes) {
      expect(notes.isValue('Note')).toBe(true);
      expect(notes.isValue('Different Note')).toBe(false);
    }
  });
});
