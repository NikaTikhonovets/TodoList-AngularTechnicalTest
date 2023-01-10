import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '@interfaces/task.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private readonly httpClient: HttpClient) { }

  public getAllTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${environment.apiUrl}/tasks`);
  }

  public getTaskById(taskId: number): Observable<Task> {
    return this.httpClient.get<Task>(`${environment.apiUrl}/tasks/${taskId}`);
  }

  public updateTask(task: Task): Observable<Task> {
    return this.httpClient.patch<Task>(`${environment.apiUrl}/tasks/${task.id}`, task);
  }

  public createTask(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(`${environment.apiUrl}/tasks`, task);
  }

  public removeTask(taskId: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${environment.apiUrl}/tasks/${taskId}`);
  }
}
