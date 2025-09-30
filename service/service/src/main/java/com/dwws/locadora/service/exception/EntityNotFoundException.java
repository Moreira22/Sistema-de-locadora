package com.dwws.locadora.service.exception;

public class EntityNotFoundException extends RuntimeException {

	public EntityNotFoundException(String razao) {
		super(razao);
	}

}
