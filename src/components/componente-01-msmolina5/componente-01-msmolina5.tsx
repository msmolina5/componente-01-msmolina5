import { Component, Host, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'componente-01-msmolina5',
  styleUrl: 'componente-01-msmolina5.css',
  shadow: true,
})
export class Componente01Msmolina5 {
  @Prop() apiUrl: string;
  @State() autos: any[] = [];
  @State() error: string = '';
  @State() searchTerm: string = '';

  async componentWillLoad() {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      this.autos = await response.json();
    } catch (err) {
      this.error = 'Failed to load data: ' + err.message;
    }
  }

  handleSearchInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value.toLowerCase();
  }

  get filteredAutos() {
    return this.autos.filter(auto => 
      auto.id.toString().includes(this.searchTerm) ||
      auto.modelo.toLowerCase().includes(this.searchTerm) ||
      auto.marca.toLowerCase().includes(this.searchTerm)
    );
  }

  render() {
    return (
      <Host>
        <div class="table-container">
          {this.error ? (
            <p class="error">{this.error}</p>
          ) : (
            <div>
              <input 
                type="text" 
                placeholder="Buscar por ID, modelo o marca" 
                onInput={(event) => this.handleSearchInput(event)} 
              />
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Modelo</th>
                    <th>Marca</th>
                    <th>Año</th>
                    <th>Precio</th>
                    <th>Imagen</th>
                    <th>Velocidad Máxima</th>
                  </tr>
                </thead>
                <tbody>
                  {this.filteredAutos.length > 0 ? (
                    this.filteredAutos.map(auto => (
                      <tr key={auto.id}>
                        <td>{auto.id}</td>
                        <td>{auto.modelo}</td>
                        <td>{auto.marca}</td>
                        <td>{auto.año}</td>
                        <td>${auto.precio}</td>
                        <td><img src={auto.imagen} alt={auto.modelo} width="100" /></td>
                        <td>{auto.velocidad_maxima}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8}>No se encontraron resultados</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Host>
    );
  }
}
